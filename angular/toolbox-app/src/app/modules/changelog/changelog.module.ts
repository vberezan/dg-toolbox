import {NgModule} from '@angular/core';
import {ChangelogComponent} from './component/changelog/changelog.component';
import {BrowserModule} from "@angular/platform-browser";
import {getApp, initializeApp, provideFirebaseApp} from "@angular/fire/app";
import {environment} from "../../../environments/environment";
import {initializeAppCheck, provideAppCheck, ReCaptchaV3Provider} from "@angular/fire/app-check";
import {getFirestore, provideFirestore} from "@angular/fire/firestore";
import {SynchronizerService} from "../local-storage/local-storage-synchronizer/service/synchronizer.service";
import { SafePipe } from './pipe/safe.pipe';


@NgModule({
  imports: [
    BrowserModule,
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
    SynchronizerService // -- contains reference to firestore,
  ],
  declarations: [
    ChangelogComponent,
    SafePipe
  ],
  bootstrap: [
    ChangelogComponent
  ]
})
export class ChangelogModule {
}
