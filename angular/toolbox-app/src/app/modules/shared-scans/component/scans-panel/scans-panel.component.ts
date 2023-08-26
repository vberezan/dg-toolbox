import {Component, inject, OnInit} from '@angular/core';
import {ScansService} from "../../service/scans.service";
import {PlanetScanEvent} from "../../../../model/shared-scans/shared-scans-planet-scan-event.model";

@Component({
  selector: 'dgt-scans-panel',
  templateUrl: './scans-panel.component.html',
  styleUrls: ['./scans-panel.component.css']
})
export class ScansPanelComponent implements OnInit {
  private scansService: ScansService = inject(ScansService);

  constructor() {
  }

  ngOnInit(): void {
    let planetScanEvent:PlanetScanEvent = this.scansService.extractScan();

    if (planetScanEvent != null) {
      this.scansService.updateScan(this.scansService.extractScan());
    }
  }
}
