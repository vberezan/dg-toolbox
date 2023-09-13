import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {ScansService} from "../../service/scans.service";
import {PlanetScanEvent} from "../../../../model/shared-scans/shared-scans-planet-scan-event.model";
import {AuthService} from "../../../authentication/service/auth.service";
import {activate} from "@angular/fire/remote-config";

@Component({
  selector: 'dgt-shared-scans-collector',
  templateUrl: './scan-collector.component.html',
  styleUrls: ['./scan-collector.component.css']
})
export class ScanCollectorComponent implements OnInit, OnDestroy {
  private scansService: ScansService = inject(ScansService);
  private authService: AuthService = inject(AuthService);
  active: boolean = false;

  constructor() {
  }

  ngOnInit(): void {
    this.authService.loggedStatus.subscribe((status: boolean) => {
      if (status) {
        let planetScanEvent: PlanetScanEvent = this.scansService.extractScan();

        if (planetScanEvent != null) {
          this.scansService.updateScan(planetScanEvent);
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
