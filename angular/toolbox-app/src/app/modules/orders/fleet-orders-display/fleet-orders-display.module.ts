import {NgModule} from '@angular/core';
import {OrdersListPanelComponent} from './component/orders-list-panel/orders-list-panel.component';
import {BrowserModule} from "@angular/platform-browser";
import {OrderService} from "./service/order.service";
import {getApp, initializeApp, provideFirebaseApp} from "@angular/fire/app";
import {environment} from "../../../../environments/environment";
import {getAuth, provideAuth} from "@angular/fire/auth";
import {getFirestore, provideFirestore} from "@angular/fire/firestore";
import {initializeAppCheck, provideAppCheck, ReCaptchaV3Provider} from "@angular/fire/app-check";
import {DarkgalaxyApiService} from "../../darkgalaxy-ui-parser/service/darkgalaxy-api.service";


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
    OrdersListPanelComponent
  ],
  providers: [
    OrderService,
    DarkgalaxyApiService
  ],
  bootstrap: [
    OrdersListPanelComponent
  ]
})
export class FleetOrdersDisplayModule {
}
