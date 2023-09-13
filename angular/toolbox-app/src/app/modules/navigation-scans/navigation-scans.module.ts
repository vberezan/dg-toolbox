import {NgModule} from '@angular/core';
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
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import {FIREBASE_OPTIONS} from "@angular/fire/compat";
import {getAuth, provideAuth} from "@angular/fire/auth";
import {AuthService} from "../authentication/service/auth.service";
import initializeApp = firebase.initializeApp;


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
        )
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
export class NavigationScansModule {
    constructor() {
    }
}
