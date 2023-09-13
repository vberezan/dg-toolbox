import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {ScansService} from "../../service/scans.service";
import {PlanetSummary} from "../../../../model/planet-list/planet-summary.planet-list-model";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {Subscription} from "rxjs";
import {User} from "@angular/fire/auth";
import {AuthService} from "../../../authentication/service/auth.service";

@Component({
    selector: 'dgt-navigation-scan-data-panel',
    templateUrl: './scan-data-panel.component.html',
    styleUrls: ['./scan-data-panel.component.css']
})
export class ScanDataPanelComponent implements OnInit, OnDestroy {
    private authService: AuthService = inject(AuthService);
    private scansService: ScansService = inject(ScansService);
    private auth: AngularFireAuth = inject(AngularFireAuth);
    private authSubscription: Subscription;
    active: boolean = false;

    constructor() {
    }

    ngOnInit() {
        this.authService.loggedStatus.subscribe((status) => {
           console.log('status: ' + status);
        });

        this.authSubscription = this.auth.authState.subscribe((user: User) => {
            if (user) {
                this.active = true;
                let summaries: PlanetSummary[] = this.scansService.extractSummaries();

                if (summaries.length > 0) {
                    this.scansService.fillScans(summaries);
                }
            } else {
                this.active = false;
            }
        });
    }

    ngOnDestroy() {
        this.authSubscription.unsubscribe();
    }

}
