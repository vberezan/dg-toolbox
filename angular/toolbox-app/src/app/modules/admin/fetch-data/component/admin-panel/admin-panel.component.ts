import {ChangeDetectorRef, Component, ElementRef, EventEmitter, inject, ViewChild} from '@angular/core';
import {PlanetsLoaderService} from "../../service/planets-loader.service";
import {PlayersRankingsLoaderService} from "../../service/players-rankings-loader.service";
import {Subscription} from "rxjs";
import {PageAction} from "../../../../../shared/model/stats/page-action.model";

@Component({
  selector: 'dgt-admin-load-data-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent {
  @ViewChild('planetsLoadModal') planetsLoadModal: ElementRef;
  @ViewChild('rankingsLoadModal') rankingsLoadModal: ElementRef;
  @ViewChild('planetProgressBar') planetProgressBar: ElementRef;
  @ViewChild('playersProgressBar') playersProgressBar: ElementRef;
  @ViewChild('planetCounter') planetCounter: ElementRef;

  private planetsLoaderService: PlanetsLoaderService = inject(PlanetsLoaderService);
  private playersRankingsLoaderService: PlayersRankingsLoaderService = inject(PlayersRankingsLoaderService);
  private changeDetection: ChangeDetectorRef = inject(ChangeDetectorRef);

  private cancelScanEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();
  private systemCountSubscription: Subscription;
  private planetsCountSubscription: Subscription;
  private rankingsCountSubscription: Subscription;

  protected controls: {
    galaxies: string
  } = {
    galaxies: ''
  }

  protected loadedRankings: string;
  protected loadedSystem: string;
  protected loadedPlanet: string = '';
  protected planetPercentage: number = 0;
  protected playersPercentage: number = 0;

  async scanNavigationScreen(): Promise<void> {
    let galaxies: number[] = this.controls.galaxies.trim().split(',').map(function (item: string) {
      return parseInt(item, 10);
    });

    this.loadedSystem = 'Loading planet systems: ';
    this.planetProgressBar.nativeElement.style.width = '0%';
    this.planetsLoadModal.nativeElement.classList.add('show');
    this.planetsLoadModal.nativeElement.classList.remove('hide');
    document.body.classList.add('dgt-overlay-open');

    this.systemCountSubscription = this.planetsLoaderService.systemScanEmitter.subscribe((value: PageAction): void => {
      this.loadedSystem = 'Loading ' + value.page + '/' + value.total + ' system: ';
      this.changeDetection.detectChanges();
      this.planetPercentage = Math.floor((value.page * 100) / value.total);
      this.planetProgressBar.nativeElement.style.width = this.planetPercentage + '%';
    });

    this.planetsCountSubscription = this.planetsLoaderService.planetScanEmitter.subscribe((value: string): void => {
      this.planetCounter.nativeElement.style.visibility = 'hidden';
      this.loadedPlanet = value;
      this.planetCounter.nativeElement.style.visibility = 'visible';
    });

    await this.planetsLoaderService.scanPlanets(this.cancelScanEmitter, galaxies);

    this.cancelScan();
  }

  async scanPlayersRankingScreens(): Promise<void> {
    this.playersProgressBar.nativeElement.style.width = '0%';
    this.loadedRankings = 'Loading ranking pages';

    this.rankingsLoadModal.nativeElement.classList.add('show');
    this.rankingsLoadModal.nativeElement.classList.remove('hide');
    document.body.classList.add('dgt-overlay-open');


    this.rankingsCountSubscription = this.playersRankingsLoaderService.playersRankingsEmitter.subscribe((value: {
      'total': number,
      'page': number,
      'action': string
    }): void => {
      switch (value.action) {
        case 'load': {
          this.loadedRankings = 'Loading ' + value.page + '/' + value.total + ' ranking page';
          this.changeDetection.detectChanges();
          this.playersPercentage = Math.floor((value.page * 100) / value.total);
          this.playersProgressBar.nativeElement.style.width = this.playersPercentage + '%';
          break;
        }
        case 'save': {
          this.loadedRankings = 'Saving ' + value.page + '/' + value.total + ' players';
          this.changeDetection.detectChanges();
          this.playersPercentage = Math.floor((value.page * 100) / value.total);
          this.playersProgressBar.nativeElement.style.width = this.playersPercentage + '%';
          break;
        }
        default : {
          break;
        }
      }
    });


    await this.playersRankingsLoaderService.scanPlayersRankingsScreens(this.cancelScanEmitter);

    this.cancelScan();
  }

  cancelScan(): void {
    this.cancelScanEmitter.emit(true);
    document.body.classList.remove('dgt-overlay-open');
    this.planetsLoadModal.nativeElement.classList.add('hide');
    this.planetsLoadModal.nativeElement.classList.remove('show');
    this.rankingsLoadModal.nativeElement.classList.add('hide');
    this.rankingsLoadModal.nativeElement.classList.remove('show');

    if (this.systemCountSubscription) {
      this.systemCountSubscription.unsubscribe();
    }

    if (this.planetsCountSubscription) {
      this.planetsCountSubscription.unsubscribe();
    }

    if (this.rankingsCountSubscription) {
      this.rankingsCountSubscription.unsubscribe();
    }
  }
}
