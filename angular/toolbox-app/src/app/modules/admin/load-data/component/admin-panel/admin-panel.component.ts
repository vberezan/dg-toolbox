import {Component, ElementRef, EventEmitter, inject, ViewChild} from '@angular/core';
import {NavigationLoaderService} from "../../service/navigation-loader.service";
import {RankingsLoaderService} from "../../service/rankings-loader.service";

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

  protected controls: {
    galaxies: string
  } = {
    galaxies: ''
  }

  protected loadedSystem: string;
  protected loadedPlanet: string = 'x.x.x.x';
  protected planetPercentage: number = 0;
  protected playersPercentage: number = 0;

  async scanNavigationScreen(): Promise<void> {
    let galaxies: number[] = this.controls.galaxies.trim().split(',').map(function (item: string) {
      return parseInt(item, 10);
    });

    let totalSystemsNr:number = this.navigationLoaderService.totalSystemsNr(galaxies);
    this.loadedSystem = 'Loading 0/' + totalSystemsNr + ' systems: ';

    this.planetProgressBar.nativeElement.style.width = '0%';
    document.body.classList.add('dgt-overlay-open');
    this.planetsLoadModal.nativeElement.classList.add('show');
    this.planetsLoadModal.nativeElement.classList.remove('hide');

    this.navigationLoaderService.systemScanEmitter.subscribe((value: number): void => {
      this.loadedSystem = 'Loading ' + value + '/' + totalSystemsNr + ' systems: ';
      this.planetPercentage = Math.floor((value * 100) / totalSystemsNr);
      this.planetProgressBar.nativeElement.style.width = this.planetPercentage + '%';
    });

    this.navigationLoaderService.planetScanEmitter.subscribe((value: string): void => {
      this.planetCounter.nativeElement.style.visibility = 'hidden';
      this.loadedPlanet = value;
      this.planetCounter.nativeElement.style.visibility = 'visible';
    });

    await this.navigationLoaderService.scanNavigationScreen(this.cancelScanEmitter, galaxies);

    document.body.classList.remove('dgt-overlay-open');
    this.planetsLoadModal.nativeElement.classList.add('hide');
    this.planetsLoadModal.nativeElement.classList.remove('show');
  }

  async scanRankingsScreens(): Promise<void> {
    document.body.classList.add('dgt-overlay-open');
    this.rankingsLoadModal.nativeElement.classList.add('show');
    this.rankingsLoadModal.nativeElement.classList.remove('hide');

    await this.rankingsLoaderService.scanPlayerRankingsScreens(this.cancelScanEmitter);
    // await this.rankingsLoaderService.scanAllianceRankingsScreens();
  }

  cancelScan(): void {
    this.cancelScanEmitter.emit(true);
    document.body.classList.remove('dgt-overlay-open');
    this.planetsLoadModal.nativeElement.classList.add('hide');
    this.planetsLoadModal.nativeElement.classList.remove('show');
    this.rankingsLoadModal.nativeElement.classList.add('hide');
    this.rankingsLoadModal.nativeElement.classList.remove('show');
  }
}
