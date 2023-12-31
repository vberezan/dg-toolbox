import {NgModule} from '@angular/core';
import {RankingsPanelComponent} from './component/rankings-panel/rankings-panel.component';
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {getApp, initializeApp, provideFirebaseApp} from "@angular/fire/app";
import {environment} from "../../../../environments/environment";
import {getAuth, provideAuth} from "@angular/fire/auth";
import {initializeAppCheck, provideAppCheck, ReCaptchaV3Provider} from "@angular/fire/app-check";
import {DecimalPipe, NgOptimizedImage} from "@angular/common";


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    FontAwesomeModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideAppCheck(() => initializeAppCheck(getApp(),
      {
        provider: new ReCaptchaV3Provider(environment.firebase.appCheck.recaptchaSiteKey),
        isTokenAutoRefreshEnabled: true
      })
    ),
    NgOptimizedImage
  ],
  declarations: [
    RankingsPanelComponent
  ],
  providers: [
    DecimalPipe
  ],
  bootstrap: [
    RankingsPanelComponent
  ]
})
export class PlayerRankingsModule {
}
