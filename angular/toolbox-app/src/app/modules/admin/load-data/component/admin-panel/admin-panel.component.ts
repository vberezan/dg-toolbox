import {Component, inject} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'dgt-admin-load-data-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent {
  private httpClient: HttpClient = inject(HttpClient);
  constructor() {
    this.httpClient.get('https://andromeda.darkgalaxy.com/', { responseType: 'text' }).subscribe(value => {
      console.log(value);
    });
  }

}
