import {NgModule, OnInit} from '@angular/core';
import {BrowserModule} from "@angular/platform-browser";
import {ScanCollectorComponent} from './component/scan-collector/scan-collector.component';
import {DarkgalaxyUiParserModule} from "../darkgalaxy-ui-parser/darkgalaxy-ui-parser.module";
import {environment} from "../../../environments/environment";
import {ScansService} from "./service/scans.service";
import {initializeAppCheck, provideAppCheck, ReCaptchaV3Provider} from "@angular/fire/app-check";
import {getApp, provideFirebaseApp} from "@angular/fire/app";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import {getFirestore, provideFirestore} from "@angular/fire/firestore";
import {FIREBASE_OPTIONS} from "@angular/fire/compat";
import {getAuth, provideAuth} from "@angular/fire/auth";
import {AuthenticationModule} from "../authentication/authentication.module";
import {AuthService} from "../authentication/service/auth.service";
import initializeApp = firebase.initializeApp;


@NgModule({
    declarations: [
        ScanCollectorComponent
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
        ScansService,
        AuthService
    ],
    bootstrap: [ScanCollectorComponent]
})
export class SharedScansModule implements OnInit {
    constructor() {
    }

    ngOnInit(): void {
    }
}
