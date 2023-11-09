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

  protected message: string;
  protected donePercentage: number = 0;

  async scanGalaxies(): Promise<void> {
    let galaxies: number[] = this.controls.galaxies.trim().split(',').map(function (item: string) {
      return parseInt(item, 10);
    });
    let estimatedCalls:number = this.navigationMatrixService.estimatedNumberOfCalls(galaxies);
    this.message = '0/' + estimatedCalls;

    document.body.classList.add('dgt-overlay-open');
    this.planetsLoadModal.nativeElement.classList.add('show');
    this.planetsLoadModal.nativeElement.classList.remove('hide');

    this.navigationMatrixService.navigationMatrixLoadEmitter.subscribe((value: number): void => {
      this.message = 'Loading ' + value + '/' + estimatedCalls;
      this.donePercentage = Math.floor((value * 100) / estimatedCalls);
      this.progressBar.nativeElement.style.width = this.donePercentage + '%';
    })

    await this.navigationMatrixService.extractGalaxies(galaxies);

    document.body.classList.remove('dgt-overlay-open');
    this.planetsLoadModal.nativeElement.classList.add('hide');
    this.planetsLoadModal.nativeElement.classList.remove('show');
  }
}
