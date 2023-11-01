import {NgModule} from '@angular/core';
import {OrdersListPanelComponent} from './component/orders-list-panel/orders-list-panel.component';
import {BrowserModule} from "@angular/platform-browser";
import {OrderService} from "./service/order.service";
import {initializeApp, provideFirebaseApp} from "@angular/fire/app";
import {environment} from "../../../../environments/environment";
import {getAuth, provideAuth} from "@angular/fire/auth";
import {getFirestore, provideFirestore} from "@angular/fire/firestore";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";


@NgModule({
  imports: [
    BrowserModule,
    FontAwesomeModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore())
  ],
  declarations: [
    OrdersListPanelComponent
  ],
  providers: [
    OrderService
  ],
  bootstrap: [
    OrdersListPanelComponent
  ]
})
export class FleetOrdersDisplayModule {
}
