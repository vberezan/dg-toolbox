import {Component, ElementRef, inject, ViewChild} from '@angular/core';
import {NavigationMatrixService} from "../../service/navigation-matrix.service";

@Component({
  selector: 'dgt-admin-load-data-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent {
  @ViewChild('planetsLoadModal') planetsLoadModal: ElementRef;
  @ViewChild('progress') progressBar: ElementRef;
  private navigationMatrixService: NavigationMatrixService = inject(NavigationMatrixService);

  protected controls: {
    galaxies: string
  } = {
    galaxies: ''
  }

  protected loadedSystem: string;
  protected loadedPlanet: string = 'x.x.x.x';
  protected donePercentage: number = 0;

  async scanGalaxies(): Promise<void> {
    let galaxies: number[] = this.controls.galaxies.trim().split(',').map(function (item: string) {
      return parseInt(item, 10);
    });
    let estimatedCalls:number = this.navigationMatrixService.estimatedNumberOfCalls(galaxies);
    this.loadedSystem = 'Loading 0/' + estimatedCalls + ' systems...';

    document.body.classList.add('dgt-overlay-open');
    this.planetsLoadModal.nativeElement.classList.add('show');
    this.planetsLoadModal.nativeElement.classList.remove('hide');

    this.navigationMatrixService.navigationMatrixSystemLoadEmitter.subscribe((value: number): void => {
      this.loadedSystem = 'Loading ' + value + '/' + estimatedCalls + ' systems...';
      this.donePercentage = Math.floor((value * 100) / estimatedCalls);
      this.progressBar.nativeElement.style.width = this.donePercentage + '%';
    });

    this.navigationMatrixService.navigationMatrixPlanetLoadEmitter.subscribe((value: string): void => {
      this.loadedPlanet = value;
    });

    await this.navigationMatrixService.extractGalaxies(galaxies);

    document.body.classList.remove('dgt-overlay-open');
    this.planetsLoadModal.nativeElement.classList.add('hide');
    this.planetsLoadModal.nativeElement.classList.remove('show');
  }
}
