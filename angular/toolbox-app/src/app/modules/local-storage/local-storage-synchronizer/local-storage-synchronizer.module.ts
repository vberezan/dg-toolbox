import {NgModule} from '@angular/core';
import {BrowserModule} from "@angular/platform-browser";
import {getApp, initializeApp, provideFirebaseApp} from "@angular/fire/app";
import {environment} from "../../../../environments/environment";
import {getFirestore, provideFirestore} from "@angular/fire/firestore";
import {initializeAppCheck, provideAppCheck, ReCaptchaV3Provider} from "@angular/fire/app-check";
import {LocalStorageSynchronizerComponent} from './component/local-storage-synchronizer/local-storage-synchronizer.component';
import {HttpClientModule} from "@angular/common/http";
import {SynchronizerService} from "./service/synchronizer.service";


@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    provideAppCheck(() => initializeAppCheck(getApp(),
      {
        provider: new ReCaptchaV3Provider(environment.firebase.appCheck.recaptchaSiteKey),
        isTokenAutoRefreshEnabled: true
      })
    )
  ],
  providers: [
    SynchronizerService
  ],
  declarations: [
    LocalStorageSynchronizerComponent,
  ],
  bootstrap: [
    LocalStorageSynchronizerComponent
  ]
})
export class LocalStorageSynchronizerModule {
}
