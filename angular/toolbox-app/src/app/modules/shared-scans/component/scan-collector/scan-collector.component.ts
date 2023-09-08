import {Component, inject, OnInit} from '@angular/core';
import {ScansService} from "../../service/scans.service";
import {PlanetScanEvent} from "../../../../model/shared-scans/shared-scans-planet-scan-event.model";

@Component({
  selector: 'dgt-shared-scans-collector',
  templateUrl: './scan-collector.component.html',
  styleUrls: ['./scan-collector.component.css']
})
export class ScanCollectorComponent implements OnInit {
  private scansService: ScansService = inject(ScansService);

  constructor() {
  }

  ngOnInit(): void {
    let planetScanEvent:PlanetScanEvent = this.scansService.extractScan();

    if (planetScanEvent != null) {
      this.scansService.updateScan(planetScanEvent);
    }
  }
}
