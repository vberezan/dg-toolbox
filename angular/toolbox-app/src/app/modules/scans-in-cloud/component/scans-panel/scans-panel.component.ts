import {Component, inject, OnInit} from '@angular/core';
import {ScansService} from "../../service/scans.service";

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
    this.scansService.updateScan(this.scansService.extractScan());
  }
}
