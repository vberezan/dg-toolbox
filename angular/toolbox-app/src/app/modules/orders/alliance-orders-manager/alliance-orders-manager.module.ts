import {NgModule} from '@angular/core';
import {OrdersPanelComponent} from './component/orders-panel/orders-panel.component';
import {BrowserModule} from "@angular/platform-browser";


@NgModule({
  declarations: [
    OrdersPanelComponent
  ],
  imports: [
    BrowserModule
  ],
  bootstrap: [OrdersPanelComponent]
})
export class AllianceOrdersManagerModule {
}
