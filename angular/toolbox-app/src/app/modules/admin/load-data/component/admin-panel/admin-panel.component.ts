import {Component, ElementRef, inject} from '@angular/core';
import {NavigationMatrixService} from "../../service/navigation-matrix.service";
import {doc} from "@angular/fire/firestore";

@Component({
  selector: 'dgt-admin-load-data-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent {
  private navigationMatrixService: NavigationMatrixService = inject(NavigationMatrixService);
  protected controls: {
    galaxies: string
  } = {
    galaxies: ''
  }

  async execute(galaxies: number[]): Promise<void> {
    return this.navigationMatrixService.extractGalaxies(galaxies);
  }

  async scanGalaxies(): Promise<void> {
    let modal: HTMLElement = document.createElement('div');
    modal.id = 'dgt-overlay-modal';

    document.body.classList.add('.dgt-overlay-open');
    document.body.prepend(modal);


    await this.execute(this.controls.galaxies.trim().split(',').map(function (item: string) {
      return parseInt(item, 10);
    }));

    document.body.classList.remove('.dgt-overlay-open');
    document.querySelector(modal.id).remove();
  }
}
