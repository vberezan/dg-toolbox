import {NgModule, OnInit} from '@angular/core';
import {BrowserModule} from "@angular/platform-browser";
import {ScanCollectorComponent} from './component/scan-collector/scan-collector.component';
import {DarkgalaxyUiParserModule} from "../darkgalaxy-ui-parser/darkgalaxy-ui-parser.module";
import {AngularFireModule} from "@angular/fire/compat";
import {environment} from "../../../environments/environment";
import {AngularFirestoreModule} from "@angular/fire/compat/firestore";
import {ScansService} from "./service/scans.service";


@NgModule({
  declarations: [
    ScanCollectorComponent
  ],
  imports: [
    BrowserModule,
    DarkgalaxyUiParserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule
  ],
  providers: [
    ScansService
  ],
  bootstrap: [ScanCollectorComponent]
})
export class SharedScansModule implements OnInit {
  constructor() {
  }

  ngOnInit(): void {
    console.log("%cDGT%c - installed shared scans collector...", "font-size: 12px; font-weight: bold;", "font-size: 12px;");
  }
}
