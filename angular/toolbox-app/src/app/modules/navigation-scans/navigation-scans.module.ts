import {inject, NgModule, OnDestroy, OnInit} from '@angular/core';
import {ScanDataPanelComponent} from './component/scan-data-panel/scan-data-panel.component';
import {BrowserModule} from "@angular/platform-browser";
import {environment} from "../../../environments/environment";
import {ScansService} from "./service/scans.service";
import {DarkgalaxyUiParserModule} from "../darkgalaxy-ui-parser/darkgalaxy-ui-parser.module";
import {ResourceProductionFormatterPipe} from "../planet-list-stats/pipe/resource-production-formatter.pipe";
import {DecimalPipe} from "@angular/common";
import {getApp, provideFirebaseApp} from "@angular/fire/app";
import {getFirestore, provideFirestore} from "@angular/fire/firestore";
import {initializeAppCheck, provideAppCheck, ReCaptchaV3Provider} from "@angular/fire/app-check";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import {FIREBASE_OPTIONS} from "@angular/fire/compat";
import {Auth, getAuth, idToken, provideAuth} from "@angular/fire/auth";
import initializeApp = firebase.initializeApp;
import {Subscription} from "rxjs";
import {PlanetSummary} from "../../model/planet-list/planet-summary.planet-list-model";


@NgModule({
    declarations: [
        ScanDataPanelComponent
    ],
    imports: [
        BrowserModule,
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideAuth(() => getAuth()),
        provideFirestore(() => getFirestore()),
        provideAppCheck(() => initializeAppCheck(getApp(),
            {
                provider: new ReCaptchaV3Provider(environment.firebase.appCheck.recaptchaSiteKey),
                isTokenAutoRefreshEnabled: true
            })
        ),
        DarkgalaxyUiParserModule,
    ],
    providers: [
        {provide: FIREBASE_OPTIONS, useValue: environment.firebase},
        DecimalPipe,
        ResourceProductionFormatterPipe,
        ScansService
    ],
    bootstrap: [
        ScanDataPanelComponent
    ]
})
export class NavigationScansModule implements OnInit, OnDestroy {
    private auth: Auth = inject(Auth);
    private idToken$ = idToken(this.auth);
    private idTokenSubscription: Subscription;

    constructor() {
    }

    ngOnInit(): void {
        this.idTokenSubscription = this.idToken$.subscribe((token: string | null) => {
            if (token == null) {
                console.log("%cDGT%c - uninstalled navigation scans panel... insufficient rights for this module!", "font-size: 12px; font-weight: bold;", "font-size: 12px;");;
            }

            console.log("%cDGT%c - installed navigation scans panel...", "font-size: 12px; font-weight: bold;", "font-size: 12px;");
        });
    }

    ngOnDestroy() {
        this.idTokenSubscription.unsubscribe();
    }
}
