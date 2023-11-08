import {Component, inject} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {firstValueFrom} from "rxjs";
import {NavigationMatrixService} from "../../service/navigation-matrix.service";

@Component({
  selector: 'dgt-admin-load-data-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent {
  private httpClient: HttpClient = inject(HttpClient);
  private navigationMatrixService: NavigationMatrixService = inject(NavigationMatrixService);

  constructor() {
    console.log(this.navigationMatrixService.generateNavigationCoordinates());

    this.execute().catch(reason => {
      console.log(reason);
    });
  }

  async execute(): Promise<void> {
    // console.log(await firstValueFrom(this.httpClient.get('https://andromeda.darkgalaxy.com/', {responseType: 'text'})));
  }

}
