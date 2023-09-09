import {NgModule, OnInit} from '@angular/core';
import {ScanDataPanelComponent} from './component/scan-data-panel/scan-data-panel.component';
import {BrowserModule} from "@angular/platform-browser";
import {AngularFireModule} from "@angular/fire/compat";
import {environment} from "../../../environments/environment";
import {AngularFirestoreModule} from "@angular/fire/compat/firestore";
import {ScansService} from "./service/scans.service";
import {DarkgalaxyUiParserModule} from "../darkgalaxy-ui-parser/darkgalaxy-ui-parser.module";
import {ResourceProductionFormatterPipe} from "../planet-list-stats/pipe/resource-production-formatter.pipe";
import {DecimalPipe} from "@angular/common";


@NgModule({
  declarations: [
    ScanDataPanelComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    DarkgalaxyUiParserModule,
  ],
  providers: [
    DecimalPipe,
    ResourceProductionFormatterPipe,
    ScansService
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
