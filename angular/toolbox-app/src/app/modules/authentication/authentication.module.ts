import {NgModule} from '@angular/core';
import {BrowserModule} from "@angular/platform-browser";
import {getApp, initializeApp, provideFirebaseApp} from "@angular/fire/app";
import {environment} from "../../../environments/environment";
import {getAuth, provideAuth} from "@angular/fire/auth";
import {LoginComponent} from './component/login/login.component';
import {getFirestore, provideFirestore} from "@angular/fire/firestore";


@NgModule({
  imports: [
    BrowserModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore())
  ],
  declarations: [
    LoginComponent
  ],
  bootstrap: [
    LoginComponent
  ]
})
export class AuthenticationModule {

}
