import {Component, inject, OnInit} from '@angular/core';
import {ScansService} from "../../service/scans.service";
import {PlanetSummary} from "../../../../model/planet-list/planet-summary.planet-list-model";

@Component({
    selector: 'dgt-navigation-scan-data-panel',
    templateUrl: './scan-data-panel.component.html',
    styleUrls: ['./scan-data-panel.component.css']
})
export class ScanDataPanelComponent implements OnInit {
    private scansService: ScansService = inject(ScansService);

    constructor() {
    }

    ngOnInit() {
        if (localStorage.getItem('user')) {
            let summaries: PlanetSummary[] = this.scansService.extractSummaries();

            if (summaries.length > 0) {
                this.scansService.fillScans(summaries);
            }
        }
    }

}
