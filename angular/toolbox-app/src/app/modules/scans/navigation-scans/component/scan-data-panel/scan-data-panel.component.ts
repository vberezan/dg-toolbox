import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {ScanService} from "../../service/scan.service";
import {PlanetSummary} from "../../../../../model/planets/planet-summary.planet-list-model";
import {AuthService} from "../../../../authentication/service/auth.service";

@Component({
  selector: 'dgt-navigation-scan-data-panel',
  templateUrl: './scan-data-panel.component.html',
  styleUrls: ['./scan-data-panel.component.css']
})
export class ScanDataPanelComponent implements OnInit, OnDestroy {
  private scanService: ScanService = inject(ScanService);
  private authService: AuthService = inject(AuthService);
  public active: boolean = false;

  ngOnInit() {
    this.authService.loggedStatus.subscribe((status: boolean) => {
      if (status) {
        let summaries: PlanetSummary[] = this.scanService.extractSummaries();

        if (summaries.length > 0) {
          this.scanService.fillScans(summaries);
        }

        this.active = true;
      } else {
        this.active = false;
      }
    });
  }

  ngOnDestroy() {
    this.authService.loggedStatus.unsubscribe();
  }

}
