import {NgModule} from '@angular/core';
import {FleetScanDetailsComponent} from './component/fleet-scan-details/fleet-scan-details.component';
import {BrowserModule} from "@angular/platform-browser";


@NgModule({
  imports: [
    BrowserModule
  ],
  declarations: [
    FleetScanDetailsComponent
  ],
  bootstrap: [FleetScanDetailsComponent]
})
export class FleetScanModule {
}
