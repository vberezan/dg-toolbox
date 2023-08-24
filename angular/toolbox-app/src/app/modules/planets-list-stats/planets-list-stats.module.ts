import {NgModule} from '@angular/core';
import {DecimalPipe} from '@angular/common';
import {StatsPanelComponent} from './component/stats-panel/stats-panel.component';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {GalaxyNameFormatterPipe} from './pipe/galaxy-name-formatter.pipe';
import {ResourceProductionFormatterPipe} from './pipe/resource-production-formatter.pipe';
import {BrowserModule} from "@angular/platform-browser";

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
  providers: [DecimalPipe],
  exports: [StatsPanelComponent],
  bootstrap: [StatsPanelComponent]
})
export class PlanetsListStatsModule {
  constructor() {
    console.log("%cDGT%c - installing planets stats...", "font-size: 12px; font-weight: bold;", "font-size: 12px;");
  }
}
