import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, inject, ViewChild} from '@angular/core';
import {SynchronizerService} from "../../service/synchronizer.service";
import {DarkgalaxyApiService} from "../../../../darkgalaxy-ui-parser/service/darkgalaxy-api.service";
import {Observable, Subscriber, Subscription} from "rxjs";
import {AuthState} from "../../../../../shared/model/authentication/auth-state.model";
import {AuthService} from "../../../../authentication/service/auth.service";
import {PageAction} from "../../../../../shared/model/stats/page-action.model";

@Component({
  selector: 'dgt-local-storage-synchronizer',
  templateUrl: './local-storage-synchronizer.component.html',
  styleUrls: ['./local-storage-synchronizer.component.css']
})
export class LocalStorageSynchronizerComponent implements AfterViewInit {
  @ViewChild('dgtUpdatingModel') dgtUpdatingModel: ElementRef;
  @ViewChild('rankingsLoadModal') rankingsLoadModal: ElementRef;
  @ViewChild('playersProgressBar') playersProgressBar: ElementRef;

  private synchronizerService: SynchronizerService = inject(SynchronizerService);
  private dgAPI: DarkgalaxyApiService = inject(DarkgalaxyApiService);
  private authService: AuthService = inject(AuthService);
  private changeDetection: ChangeDetectorRef = inject(ChangeDetectorRef);

  private rankingsCountSubscription: Subscription;

  public authenticated: boolean = false;

  protected loadedRankings: string;
  protected playersPercentage: number = 0;

  constructor() {
    this.authService.authState.subscribe((state: AuthState): void => {
      this.authenticated = state.status;
    });

    this.authService.checkLoginValidity();
  }

  ngAfterViewInit(): void {
    this.synchronizerService.updatesEmitter.subscribe((updateNumber: number): void => {
      if (updateNumber == 0) {
        this.delay(1000).then((): void => {
          this.dgtUpdatingModel.nativeElement.classList.add('hide');
          this.dgtUpdatingModel.nativeElement.classList.remove('show');
          document.body.classList.remove('dgt-overlay-open');
          window.location.reload();
        });
      } else {
        if (!document.body.classList.contains('dgt-overlay-open')) {
          this.dgtUpdatingModel.nativeElement.classList.add('show');
          this.dgtUpdatingModel.nativeElement.classList.remove('hide');
          document.body.classList.add('dgt-overlay-open');
          this.delay(1000).then((): void => {
          });
        }
      }
    });

    let subscription: Subscription = new Observable((observer: Subscriber<boolean>): void => {
      this.synchronizerService.updateMetadata(observer);
    }).subscribe((loaded: boolean): void => {
      if (loaded) {
        this.synchronizerService.loadPlanets()
          .then((): void => {
            this.loadRankings();
          });

        subscription.unsubscribe();
      }
    });
  }

  private loadRankings(): void {
    this.rankingsCountSubscription = this.synchronizerService.playersRankingsEmitter.subscribe((value: PageAction): void => {
      switch (value.action) {
        case 'load': {
          this.loadedRankings = 'Loading ' + value.page + '/' + value.total + ' ranking page';
          this.changeDetection.detectChanges();
          this.playersPercentage = Math.floor((value.page * 100) / value.total);
          this.playersProgressBar.nativeElement.style.width = this.playersPercentage + '%';
          break;
        }
        case 'save': {
          this.loadedRankings = 'Caching ' + value.page + '/' + value.total + ' players';
          this.changeDetection.detectChanges();
          this.playersPercentage = Math.floor((value.page * 100) / value.total);
          this.playersProgressBar.nativeElement.style.width = this.playersPercentage + '%';

          if (value.page == value.total) {
            this.rankingsCountSubscription.unsubscribe();
          }

          break;
        }
        default : {
          break;
        }
      }
    });

    this.synchronizerService.loadRankings(this.dgAPI.gameTurn(), (popup: string): void => {
      switch (popup) {
        case 'players-rankings':
          this.dgtUpdatingModel.nativeElement.classList.add('hide');
          this.dgtUpdatingModel.nativeElement.classList.remove('show');
          document.body.classList.remove('dgt-overlay-open');

          this.playersProgressBar.nativeElement.style.width = '0%';
          this.loadedRankings = 'Loading ranking pages';

          this.rankingsLoadModal.nativeElement.classList.add('show');
          this.rankingsLoadModal.nativeElement.classList.remove('hide');
          document.body.classList.add('dgt-overlay-open');

          break;
        case 'alliance-members':
          this.rankingsLoadModal.nativeElement.classList.remove('show');
          this.rankingsLoadModal.nativeElement.classList.add('hide');
          document.body.classList.remove('dgt-overlay-open');

          this.dgtUpdatingModel.nativeElement.classList.remove('hide');
          this.dgtUpdatingModel.nativeElement.classList.add('show');
          document.body.classList.add('dgt-overlay-open');

          break;
        default:
          break;
      }
    });
  }


  private delay = async (ms: number): Promise<unknown> => new Promise(res => setTimeout(res, ms));
}
