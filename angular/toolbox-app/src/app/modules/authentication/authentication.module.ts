import {NgModule} from '@angular/core';
import {BrowserModule} from "@angular/platform-browser";
import {provideFirebaseApp} from "@angular/fire/app";
import {environment} from "../../../environments/environment";
import {getAuth, provideAuth} from "@angular/fire/auth";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import {LoginComponent} from './component/login/login.component';
import {AuthService} from "./service/auth.service";
import initializeApp = firebase.initializeApp;
import {FIREBASE_OPTIONS} from "@angular/fire/compat";


@NgModule({
    declarations: [
        LoginComponent
    ],
    imports: [
        BrowserModule,
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideAuth(() => getAuth())
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
}
