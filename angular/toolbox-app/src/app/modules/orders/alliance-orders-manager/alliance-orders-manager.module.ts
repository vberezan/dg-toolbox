import {NgModule} from '@angular/core';
import {OrdersPanelComponent} from './component/orders-panel/orders-panel.component';
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";
import {OrderService} from "./service/order.service";
import {DarkgalaxyApiService} from "../../darkgalaxy-ui-parser/service/darkgalaxy-api.service";


@NgModule({
  declarations: [
    OrdersPanelComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [
    OrderService,
    DarkgalaxyApiService
  ],
  bootstrap: [OrdersPanelComponent]
})
export class AllianceOrdersManagerModule {
}
