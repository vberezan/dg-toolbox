import {NgModule} from '@angular/core';
import {MembersPanelComponent} from './component/members-panel/members-panel.component';
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";
import {getApp, initializeApp, provideFirebaseApp} from "@angular/fire/app";
import {environment} from "../../../../environments/environment";
import {getAuth, provideAuth} from "@angular/fire/auth";
import {initializeAppCheck, provideAppCheck, ReCaptchaV3Provider} from "@angular/fire/app-check";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {KickMemberFormatterPipe} from './pipe/kick-member-formatter.pipe';


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
    )
  ],
  declarations: [
    MembersPanelComponent,
    KickMemberFormatterPipe
  ],
  bootstrap: [MembersPanelComponent]
})
export class AllianceMembersModule {
}
