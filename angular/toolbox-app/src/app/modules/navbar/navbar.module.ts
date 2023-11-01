import {NgModule} from '@angular/core';
import {MenuComponent} from './component/menu-replacement/menu.component';
import {BrowserModule} from "@angular/platform-browser";
import {ActiveTabDirective} from './directive/active-tab.directive';
import {BadgeService} from "./service/badge.service";
import {getApp, initializeApp, provideFirebaseApp} from "@angular/fire/app";
import {environment} from "../../../environments/environment";
import {getAuth, provideAuth} from "@angular/fire/auth";
import {getFirestore, provideFirestore} from "@angular/fire/firestore";
import {initializeAppCheck, provideAppCheck, ReCaptchaV3Provider} from "@angular/fire/app-check";
import {getAnalytics, provideAnalytics} from "@angular/fire/analytics";

@NgModule({
  imports: [
    BrowserModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideAnalytics(() => getAnalytics())
  ],
  exports: [MenuComponent],
  declarations: [
    MenuComponent,
    ActiveTabDirective
  ],
  providers: [
    BadgeService
  ],
  bootstrap: [MenuComponent]
})
export class NavbarModule {
}
