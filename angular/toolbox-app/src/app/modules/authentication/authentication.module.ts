import {NgModule} from '@angular/core';
import {BrowserModule} from "@angular/platform-browser";
import {getApp, initializeApp, provideFirebaseApp} from "@angular/fire/app";
import {environment} from "../../../environments/environment";
import {getAuth, provideAuth} from "@angular/fire/auth";
import {LoginComponent} from './component/login/login.component';
import {getFirestore, provideFirestore} from "@angular/fire/firestore";
import {initializeAppCheck, provideAppCheck, ReCaptchaV3Provider} from "@angular/fire/app-check";
import {LocalStorageService} from "../../shared/service/local-storage.service";


@NgModule({
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
    LocalStorageService
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
