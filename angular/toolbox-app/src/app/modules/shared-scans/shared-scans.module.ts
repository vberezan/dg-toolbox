import {NgModule, OnInit} from '@angular/core';
import {BrowserModule} from "@angular/platform-browser";
import {ScansPanelComponent} from './component/scans-panel/scans-panel.component';
import {DarkgalaxyApiService} from "../darkgalaxy-ui-parser/service/darkgalaxy-api.service";
import {DarkgalaxyUiParserModule} from "../darkgalaxy-ui-parser/darkgalaxy-ui-parser.module";
import {AngularFireModule} from "@angular/fire/compat";
import {environment} from "../../../environments/environment";
import {AngularFirestoreModule} from "@angular/fire/compat/firestore";
import {ScansService} from "./service/scans.service";


@NgModule({
  declarations: [
    ScansPanelComponent
  ],
  imports: [
    BrowserModule,
    DarkgalaxyUiParserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule
  ],
  providers: [
    DarkgalaxyApiService,
    ScansService
  ],
  bootstrap: [ScansPanelComponent]
})
export class SharedScansModule implements OnInit {
  constructor() {
  }

  ngOnInit(): void {
    console.log("%cDGT%c - installed shared scans...", "font-size: 12px; font-weight: bold;", "font-size: 12px;");
  }
}
