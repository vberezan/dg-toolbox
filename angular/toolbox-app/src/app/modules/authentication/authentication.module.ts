import {NgModule} from '@angular/core';
import {BrowserModule} from "@angular/platform-browser";
import {getApp, provideFirebaseApp} from "@angular/fire/app";
import {environment} from "../../../environments/environment";
import {getAuth, provideAuth} from "@angular/fire/auth";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import {LoginComponent} from './component/login/login.component';
import {AuthService} from "./service/auth.service";
import initializeApp = firebase.initializeApp;
import {FIREBASE_OPTIONS} from "@angular/fire/compat";
import {getFirestore, provideFirestore} from "@angular/fire/firestore";
import {initializeAppCheck, provideAppCheck, ReCaptchaV3Provider} from "@angular/fire/app-check";


@NgModule({
    declarations: [
        LoginComponent
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
    ],
    providers: [
        AuthService,
        {provide: FIREBASE_OPTIONS, useValue: environment.firebase},
    ],
    bootstrap: [
        LoginComponent
    ]
})
export class AuthenticationModule {
    constructor() {}

}
