import {Component, inject} from '@angular/core';
import {NavigationMatrixService} from "../../service/navigation-matrix.service";

@Component({
  selector: 'dgt-admin-load-data-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent {
  private navigationMatrixService: NavigationMatrixService = inject(NavigationMatrixService);

  constructor() {
    console.log(this.navigationMatrixService.generateNavigationCoordinates());

    console.log(JSON.stringify(this.navigationMatrixService.extractData(1,1,1)));
  }

}
