import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {ScansService} from "../../service/scans.service";
import {PlanetSummary} from "../../../../model/planet-list/planet-summary.planet-list-model";
import {Auth, idToken} from "@angular/fire/auth";
import {Subscription} from "rxjs";

@Component({
  selector: 'dgt-navigation-scan-data-panel',
  templateUrl: './scan-data-panel.component.html',
  styleUrls: ['./scan-data-panel.component.css']
})
export class ScanDataPanelComponent implements OnInit, OnDestroy {
  private scansService: ScansService = inject(ScansService);
  private auth: Auth = inject(Auth);
  private idToken$ = idToken(this.auth);
  private idTokenSubscription: Subscription;

  constructor() {
  }

  ngOnDestroy() {
    this.idTokenSubscription.unsubscribe();
  }

  ngOnInit() {
    this.idTokenSubscription = this.idToken$.subscribe((token: string | null) => {
      if (token == null) {
        console.log('Permission Denied!');
      }

      let summaries: PlanetSummary[] = this.scansService.extractSummaries();

      if (summaries.length > 0) {
        this.scansService.fillScans(summaries);

      }
    })
  }

}
