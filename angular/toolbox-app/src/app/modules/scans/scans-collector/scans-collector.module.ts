import {NgModule} from '@angular/core';
import {BrowserModule} from "@angular/platform-browser";
import {ScanCollectorComponent} from './component/scan-collector/scan-collector.component';
import {environment} from "../../../../environments/environment";
import {ScanService} from "./service/scan.service";
import {initializeAppCheck, provideAppCheck, ReCaptchaV3Provider} from "@angular/fire/app-check";
import {getApp, initializeApp, provideFirebaseApp} from "@angular/fire/app";
import {getFirestore, provideFirestore} from "@angular/fire/firestore";
import {getAuth, provideAuth} from "@angular/fire/auth";


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
    )
  ],
  declarations: [
    ScanCollectorComponent
  ],
  providers: [
    ScanService
  ],
  bootstrap: [ScanCollectorComponent]
})
export class ScansCollectorModule {
}
