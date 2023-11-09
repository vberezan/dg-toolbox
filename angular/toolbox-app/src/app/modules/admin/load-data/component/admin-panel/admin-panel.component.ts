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
    this.navigationMatrixService.extractData(1,1,1).then(value => {
      this.navigationMatrixService.extractData(1,1,2);
    }).then(value => {
      this.navigationMatrixService.extractData(1,1,3);
    });
  }

}
