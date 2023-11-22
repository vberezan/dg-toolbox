import {NgModule} from '@angular/core';
import {BrowserModule} from "@angular/platform-browser";
import {getApp, initializeApp, provideFirebaseApp} from "@angular/fire/app";
import {environment} from "../../../../environments/environment";
import {getFirestore, provideFirestore} from "@angular/fire/firestore";
import {initializeAppCheck, provideAppCheck, ReCaptchaV3Provider} from "@angular/fire/app-check";
import {LocalStorageSynchronizerComponent} from './component/local-storage-synchronizer/local-storage-synchronizer.component';
import {HttpClientModule} from "@angular/common/http";
import {MetadataService} from "./service/metadata.service";
import {getAuth, provideAuth} from "@angular/fire/auth";


@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
    provideAppCheck(() => initializeAppCheck(getApp(),
      {
        provider: new ReCaptchaV3Provider(environment.firebase.appCheck.recaptchaSiteKey),
        isTokenAutoRefreshEnabled: true
      })
    )
  ],
  declarations: [
    LocalStorageSynchronizerComponent,
  ],
  providers: [
    MetadataService // -- contains reference to firestore
  ],
  bootstrap: [
    LocalStorageSynchronizerComponent
  ]
})
export class LocalStorageSynchronizerModule {
}
