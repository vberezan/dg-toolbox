import {NgModule} from '@angular/core';
import {DecimalPipe} from '@angular/common';
import {StatsPanelComponent} from './component/stats-panel/stats-panel.component';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {GalaxyNameFormatterPipe} from './pipe/galaxy-name-formatter.pipe';
import {ResourceProductionFormatterPipe} from './pipe/resource-production-formatter.pipe';
import {BrowserModule} from "@angular/platform-browser";
import {StatsPanelService} from "./service/stats-panel.service";
import {DarkgalaxyApiService} from "../../darkgalaxy-ui-parser/service/darkgalaxy-api.service";

@NgModule({
  imports: [
    BrowserModule,
    FontAwesomeModule
  ],
  exports: [StatsPanelComponent],
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
  bootstrap: [StatsPanelComponent]
})
export class PlanetListStatsModule {
}
