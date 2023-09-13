import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {ScansService} from "../../service/scans.service";
import {PlanetSummary} from "../../../../model/planet-list/planet-summary.planet-list-model";
import {AuthService} from "../../../authentication/service/auth.service";

@Component({
    selector: 'dgt-navigation-scan-data-panel',
    templateUrl: './scan-data-panel.component.html',
    styleUrls: ['./scan-data-panel.component.css']
})
export class ScanDataPanelComponent implements OnInit, OnDestroy {
    private authService: AuthService = inject(AuthService);
    private scansService: ScansService = inject(ScansService);
    active: boolean = false;

    constructor() {
    }

    ngOnInit() {
        this.authService.loggedStatus.subscribe((status: boolean) => {
            if (status) {
                let summaries: PlanetSummary[] = this.scansService.extractSummaries();

                if (summaries.length > 0) {
                    this.scansService.fillScans(summaries);
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
