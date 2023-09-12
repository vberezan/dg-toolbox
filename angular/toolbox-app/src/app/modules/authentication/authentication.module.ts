import {NgModule} from '@angular/core';
import {BrowserModule} from "@angular/platform-browser";
import {provideFirebaseApp} from "@angular/fire/app";
import {environment} from "../../../environments/environment";
import {getAuth, provideAuth} from "@angular/fire/auth";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import initializeApp = firebase.initializeApp;


@NgModule({
    declarations: [],
    imports: [
        BrowserModule,
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideAuth(() => getAuth())
    ]
})
export class AuthenticationModule {
}
