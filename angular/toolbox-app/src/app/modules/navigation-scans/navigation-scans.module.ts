import {NgModule, OnInit} from '@angular/core';
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
import {getAuth, provideAuth, user} from "@angular/fire/auth";
import {AuthenticationModule} from "../authentication/authentication.module";
import {AuthService} from "../authentication/service/auth.service";
import initializeApp = firebase.initializeApp;


@NgModule({
    declarations: [
        ScanDataPanelComponent
    ],
    imports: [
        BrowserModule,
        AuthenticationModule,
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
        ScansService,
        AuthService
    ],
    bootstrap: [
        ScanDataPanelComponent
    ]
})
export class NavigationScansModule implements OnInit {
    constructor() {
    }

    ngOnInit(): void {
        if (localStorage.getItem('key') == null) {
            console.log("%cDGT%c - navigation scans panel not installed... insufficient rights for this module!", "font-size: 12px; font-weight: bold;", "font-size: 12px;");
        } else {
            console.log("%cDGT%c - installed navigation scans panel...", "font-size: 12px; font-weight: bold;", "font-size: 12px;");
        }
    }
}
