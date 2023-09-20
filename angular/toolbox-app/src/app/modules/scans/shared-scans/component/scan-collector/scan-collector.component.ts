import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {ScanService} from "../../service/scan.service";
import {PlanetScanEvent} from "../../../../../model/scans/shared-scans-planet-scan-event.model";
import {AuthService} from "../../../../authentication/service/auth.service";
import {activate} from "@angular/fire/remote-config";

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
      if (status) {
        let planetScanEvent: PlanetScanEvent = this.scanService.extractScan();

        if (planetScanEvent != null) {
          this.scanService.updateScan(planetScanEvent);
        }

        this.active = true;
      } else{
        this.active = false;
      }
    });
  }

  ngOnDestroy(): void {
    this.authService.loggedStatus.unsubscribe();
  }
}
