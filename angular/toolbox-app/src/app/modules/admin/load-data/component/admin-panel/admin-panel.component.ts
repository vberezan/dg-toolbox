import {Component, inject} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {firstValueFrom} from "rxjs";

@Component({
  selector: 'dgt-admin-load-data-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent {
  private httpClient: HttpClient = inject(HttpClient);

  constructor() {
    this.execute().catch(reason => {
      console.log(reason);
    });
  }

  async execute(): Promise<void> {
    console.log(await firstValueFrom(this.httpClient.get('https://andromeda.darkgalaxy.com/', {responseType: 'text'})));
  }

}
