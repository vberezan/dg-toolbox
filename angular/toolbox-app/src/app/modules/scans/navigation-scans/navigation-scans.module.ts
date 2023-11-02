import {NgModule} from '@angular/core';
import {ScanDataPanelComponent} from './component/scan-data-panel/scan-data-panel.component';
import {BrowserModule} from "@angular/platform-browser";
import {environment} from "../../../../environments/environment";
import {ScanService} from "./service/scan.service";
import {ResourceProductionFormatterPipe} from "../../planets/planet-list-stats/pipe/resource-production-formatter.pipe";
import {DecimalPipe} from "@angular/common";
import {getApp, initializeApp, provideFirebaseApp} from "@angular/fire/app";
import {getFirestore, provideFirestore} from "@angular/fire/firestore";
import {initializeAppCheck, provideAppCheck, ReCaptchaV3Provider} from "@angular/fire/app-check";
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
    ScanDataPanelComponent
  ],
  providers: [
    DecimalPipe,
    ResourceProductionFormatterPipe,
    ScanService
  ],
  bootstrap: [
    ScanDataPanelComponent
  ]
})
export class NavigationScansModule {
}
