import {NgModule, OnInit} from '@angular/core';
import {DecimalPipe} from '@angular/common';
import {StatsPanelComponent} from './component/stats-panel/stats-panel.component';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {GalaxyNameFormatterPipe} from './pipe/galaxy-name-formatter.pipe';
import {ResourceProductionFormatterPipe} from './pipe/resource-production-formatter.pipe';
import {BrowserModule} from "@angular/platform-browser";
import {DarkgalaxyUiParserModule} from "../darkgalaxy-ui-parser/darkgalaxy-ui-parser.module";
import {StatsPanelService} from "./service/stats-panel.service";
import {DarkgalaxyApiService} from "../darkgalaxy-ui-parser/service/darkgalaxy-api.service";

@NgModule({
  imports: [
    BrowserModule,
    FontAwesomeModule
  ],
  declarations: [
    StatsPanelComponent,
    GalaxyNameFormatterPipe,
    ResourceProductionFormatterPipe,
  ],
  providers: [
    DecimalPipe,
    StatsPanelService,
    DarkgalaxyApiService
  ],
  exports: [StatsPanelComponent],
  bootstrap: [StatsPanelComponent]
})
export class PlanetListStatsModule implements OnInit {
  constructor() {
  }

  ngOnInit(): void {}
}
