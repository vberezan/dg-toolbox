import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {ScanService} from "../../service/scan.service";
import {PlanetSummary} from "../../../../../shared/model/planets/planet-summary.planet-list-model";
import {AuthService} from "../../../../authentication/service/auth.service";
import {AuthState} from "../../../../../shared/model/authentication/auth-state.model";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {lastValueFrom} from "rxjs";

@Component({
  selector: 'dgt-navigation-scan-data-panel',
  templateUrl: './scan-data-panel.component.html',
  styleUrls: ['./scan-data-panel.component.css']
})
export class ScanDataPanelComponent implements OnInit, OnDestroy {
  private scanService: ScanService = inject(ScanService);
  private authService: AuthService = inject(AuthService);
  private http: HttpClient = inject(HttpClient);

  public active: boolean = false;

  constructor() {
    // const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
    // let response: string = await lastValueFrom(this.http.get('https://andromeda.darkgalaxy.com/navigation/1/18/3/', { headers, responseType: 'text'}));
    //
    // this.http.get('https://andromeda.darkgalaxy.com/navigation/1/18/3/', { headers, responseType: 'text'}).subscribe(value => {
    //   console.log(value);
    // });


  }

  ngOnInit() {
    this.authService.authState.subscribe((state: AuthState) => {
      this.active = state.status;

      if (state.status) {
        let summaries: PlanetSummary[] = this.scanService.extractSummaries();

        if (summaries.length > 0) {
          this.scanService.fillScans(summaries);
        }
      }
    });
  }

  ngOnDestroy() {
    this.authService.authState.unsubscribe();
  }

}
