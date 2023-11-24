import { NgModule } from '@angular/core';
import { FleetScanDetailsComponent } from './component/fleet-scan-details/fleet-scan-details.component';
import {BrowserModule} from "@angular/platform-browser";
import {SafePipe} from "./pipe/safe.pipe";



@NgModule({
  imports: [
    BrowserModule
  ],
  declarations: [
    FleetScanDetailsComponent,
    SafePipe
  ],
  bootstrap: [FleetScanDetailsComponent]
})
export class FleetScanModule { }
