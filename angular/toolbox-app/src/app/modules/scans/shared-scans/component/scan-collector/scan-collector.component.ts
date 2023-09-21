import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {ScanService} from "../../service/scan.service";
import {PlanetScanEvent} from "../../../../../model/scans/shared-scans-planet-scan-event.model";
import {AuthService} from "../../../../authentication/service/auth.service";

@Component({
  selector: 'dgt-shared-scans-collector',
  templateUrl: './scan-collector.component.html',
  styleUrls: ['./scan-collector.component.css']
})
export class ScanCollectorComponent implements OnInit, OnDestroy {
  private scanService: ScanService = inject(ScanService);
  private authService: AuthService = inject(AuthService);
  active: boolean = false;

  ngOnInit(): void {
    this.authService.loggedStatus.subscribe((status: boolean) => {
      this.active = status;

      if (status) {
        let planetScanEvent: PlanetScanEvent = this.scanService.extractScan();

        if (planetScanEvent != null) {
          this.scanService.updateScan(planetScanEvent);
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.authService.loggedStatus.unsubscribe();
  }
}
