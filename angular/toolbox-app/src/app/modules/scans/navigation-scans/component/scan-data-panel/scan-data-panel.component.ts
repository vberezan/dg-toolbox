import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {ScanService} from "../../service/scan.service";
import {PlanetSummary} from "../../../../../shared/model/planets/planet-summary.planet-list-model";
import {AuthService} from "../../../../authentication/service/auth.service";
import {AuthState} from "../../../../../shared/model/authentication/auth-state.model";

@Component({
  selector: 'dgt-navigation-scan-data-panel',
  templateUrl: './scan-data-panel.component.html',
  styleUrls: ['./scan-data-panel.component.css']
})
export class ScanDataPanelComponent implements OnInit, OnDestroy {
  private scanService: ScanService = inject(ScanService);
  private authService: AuthService = inject(AuthService);

  public active: boolean = false;

  ngOnInit(): void {
    this.authService.authState.subscribe((state: AuthState) => {
      this.active = state.status;

      if (state.status) {
        let summaries: PlanetSummary[] = this.scanService.extractSummaries();

        if (summaries.length > 0) {
          this.scanService.fillScans(summaries);
        }
      }
    });

    this.authService.checkLoginValidity(true);
  }

  ngOnDestroy(): void {
    this.authService.authState.unsubscribe();
  }

}
