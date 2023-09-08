import {NgModule, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ScanDataPanelComponent} from './component/scan-data-panel/scan-data-panel.component';


@NgModule({
  declarations: [
    ScanDataPanelComponent
  ],
  imports: [
    CommonModule
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
