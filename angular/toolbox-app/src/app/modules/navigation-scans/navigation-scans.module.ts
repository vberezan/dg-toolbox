import {NgModule, OnInit} from '@angular/core';
import {ScanDataPanelComponent} from './component/scan-data-panel/scan-data-panel.component';
import {BrowserModule} from "@angular/platform-browser";


@NgModule({
  declarations: [
    ScanDataPanelComponent
  ],
  imports: [
    BrowserModule
  ],
  bootstrap: [
    ScanDataPanelComponent
  ]
})
export class NavigationScansModule implements OnInit {
  constructor() {
  }

  ngOnInit(): void {
    console.log("%cDGT%c - installed navigation scans panel...", "font-size: 12px; font-weight: bold;", "font-size: 12px;");
  }
}
