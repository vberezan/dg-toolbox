import {Component, ElementRef, EventEmitter, inject, ViewChild} from '@angular/core';
import {NavigationLoaderService} from "../../service/navigation-loader.service";
import {RankingsLoaderService} from "../../service/rankings-loader.service";
import {Subscription} from "rxjs";

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

  private navigationLoaderService: NavigationLoaderService = inject(NavigationLoaderService);
  private rankingsLoaderService: RankingsLoaderService = inject(RankingsLoaderService);
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
  protected loadedPlanet: string = 'x.x.x.x';
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

    this.systemCountSubscription = this.navigationLoaderService.systemScanEmitter.subscribe((value: {'total':number, 'system': number}): void => {
      this.loadedSystem = 'Loading ' + value.system + '/' + value.total + ' system: ';
      this.planetPercentage = Math.floor((value.system * 100) / value.total);
      this.planetProgressBar.nativeElement.style.width = this.planetPercentage + '%';
    });

    this.planetsCountSubscription = this.navigationLoaderService.planetScanEmitter.subscribe((value: string): void => {
      this.planetCounter.nativeElement.style.visibility = 'hidden';
      this.loadedPlanet = value;
      this.planetCounter.nativeElement.style.visibility = 'visible';
    });

    await this.navigationLoaderService.scanNavigationScreen(this.cancelScanEmitter, galaxies);

    this.cancelScan();
  }

  async scanRankingsScreens(): Promise<void> {
    this.playersProgressBar.nativeElement.style.width = '0%';
    this.loadedRankings = 'Loading ranking pages';

    this.rankingsLoadModal.nativeElement.classList.add('show');
    this.rankingsLoadModal.nativeElement.classList.remove('hide');
    document.body.classList.add('dgt-overlay-open');


    this.rankingsCountSubscription = this.rankingsLoaderService.playersRankingsEmitter.subscribe((value: {'total':number, 'page': number}): void => {
      this.loadedRankings = 'Loading ' + value.page + '/' + value.total + ' ranking page';
      this.playersPercentage = Math.floor((value.page * 100) / value.total);
      this.playersProgressBar.nativeElement.style.width = this.playersPercentage + '%';
    });


    await this.rankingsLoaderService.scanPlayerRankingsScreens(this.cancelScanEmitter);
    // await this.rankingsLoaderService.scanAllianceRankingsScreens();

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
