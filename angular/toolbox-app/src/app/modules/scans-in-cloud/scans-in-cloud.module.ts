import {NgModule} from '@angular/core';
import {BrowserModule} from "@angular/platform-browser";
import {ScansPanelComponent} from './component/scans-panel/scans-panel.component';
import {DarkgalaxyApiService} from "../darkgalaxy-ui-parser/service/darkgalaxy-api.service";
import {DarkgalaxyUiParserModule} from "../darkgalaxy-ui-parser/darkgalaxy-ui-parser.module";
import {AngularFireModule} from "@angular/fire/compat";
import {environment} from "../../../environments/environment";
import {AngularFirestoreModule} from "@angular/fire/compat/firestore";


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
    DarkgalaxyApiService
  ],
  bootstrap: [ScansPanelComponent]
})
export class ScansInCloudModule {
  constructor() {
    console.log("%cDGT%c - installing scans in cloud...", "font-size: 12px; font-weight: bold;", "font-size: 12px;");
  }
}
