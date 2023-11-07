import {NgModule} from '@angular/core';
import {LocalStorageManagerComponent} from './component/local-storage-manager/local-storage-manager.component';
import {BrowserModule} from "@angular/platform-browser";
import {getApp, initializeApp, provideFirebaseApp} from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getAnalytics, provideAnalytics, ScreenTrackingService, UserTrackingService } from '@angular/fire/analytics';
import {initializeAppCheck, provideAppCheck, ReCaptchaV3Provider} from '@angular/fire/app-check';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import {environment} from "../../../environments/environment";


@NgModule({
  imports: [
    BrowserModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideAnalytics(() => getAnalytics()),
    provideAppCheck(() => initializeAppCheck(getApp(),
      {
        provider: new ReCaptchaV3Provider(environment.firebase.appCheck.recaptchaSiteKey),
        isTokenAutoRefreshEnabled: true
      })
    ),
    provideFirestore(() => getFirestore())
  ],
  declarations: [
    LocalStorageManagerComponent
  ],
  bootstrap: [
    LocalStorageManagerComponent
  ],
  providers: [
    ScreenTrackingService,
    UserTrackingService
  ]
})
export class LocalStorageManagerModule {
}
