import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, inject, ViewChild} from '@angular/core';
import {SynchronizerService} from "../../service/synchronizer.service";
import {DarkgalaxyApiService} from "../../../../darkgalaxy-ui-parser/service/darkgalaxy-api.service";
import {Observable, Subscriber, Subscription} from "rxjs";
import {AuthState} from "../../../../../shared/model/authentication/auth-state.model";
import {AuthService} from "../../../../authentication/service/auth.service";
import {PageAction} from "../../../../../shared/model/stats/page-action.model";
import {MetadataService} from "../../service/metadata.service";

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
  private metadataService: MetadataService = inject(MetadataService);

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
    this.metadataService.resetSortingMaps();
    this.prepareRankingsLoader();

    this.synchronizerService.updatesEmitter.subscribe((updateNumber: number): void => {
      switch (updateNumber) {
        case -1: {
          this.synchronizerService.loadRankings(this.dgAPI.gameTurn(), this.dgAPI.getCountDownMinutes(), true);
          break;
        }
        case 0:
          window.location.reload();
          break;
        case 1:
          this.rankingsLoadModal.nativeElement.classList.add('hide');
          this.rankingsLoadModal.nativeElement.classList.remove('show');
          document.body.classList.remove('dgt-overlay-open');

          this.dgtUpdatingModel.nativeElement.classList.add('show');
          this.dgtUpdatingModel.nativeElement.classList.remove('hide');
          document.body.classList.add('dgt-overlay-open');

          this.delay(500).then((): void => {});
          break;
        case 2:
          this.dgtUpdatingModel.nativeElement.classList.add('hide');
          this.dgtUpdatingModel.nativeElement.classList.remove('show');
          document.body.classList.remove('dgt-overlay-open');

          this.playersProgressBar.nativeElement.style.width = '0%';
          this.loadedRankings = 'Loading ranking pages';

          this.rankingsLoadModal.nativeElement.classList.add('show');
          this.rankingsLoadModal.nativeElement.classList.remove('hide');
          document.body.classList.add('dgt-overlay-open');
          break;
        default:
          break;
      }
    });

    let subscription: Subscription = new Observable((observer: Subscriber<boolean>): void => {
      this.synchronizerService.updateMetadata(observer);
    }).subscribe((loaded: boolean): void => {
      if (loaded) {
        this.synchronizerService.loadPlanets(this.dgAPI.gameTurn(), this.dgAPI.getCountDownMinutes()).catch((error: any): void => console.log(error));
        subscription.unsubscribe();
      }
    });
  }

  private prepareRankingsLoader(): void {
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
  }


  private delay = async (ms: number): Promise<unknown> => new Promise(res => setTimeout(res, ms));
}
