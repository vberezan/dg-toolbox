import {Component, ElementRef, inject, ViewChild} from '@angular/core';
import {NavigationMatrixService} from "../../service/navigation-matrix.service";

@Component({
  selector: 'dgt-admin-load-data-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent {
  @ViewChild('planetsLoadModal') planetsLoadModal: ElementRef;
  private navigationMatrixService: NavigationMatrixService = inject(NavigationMatrixService);

  protected controls: {
    galaxies: string
  } = {
    galaxies: ''
  }

  protected message: string;

  async scanGalaxies(): Promise<void> {
    document.body.classList.add('dgt-overlay-open');
    this.planetsLoadModal.nativeElement.classList.add('show');
    this.planetsLoadModal.nativeElement.classList.remove('hide');

    await this.navigationMatrixService
      .extractGalaxies(
        this.message,
        this.controls.galaxies.trim().split(',').map(function (item: string) {
          return parseInt(item, 10);
        })
      );

    document.body.classList.remove('dgt-overlay-open');
    this.planetsLoadModal.nativeElement.classList.add('hide');
    this.planetsLoadModal.nativeElement.classList.remove('show');
  }
}
