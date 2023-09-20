import {NgModule} from '@angular/core';
import {OrdersPanelComponent} from './component/orders-panel/orders-panel.component';
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    OrdersPanelComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  bootstrap: [OrdersPanelComponent]
})
export class AllianceOrdersManagerModule {
}
