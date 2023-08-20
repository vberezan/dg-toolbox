import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {RouterLink, RouterLinkActive} from "@angular/router";
import {TranslateModule} from "@ngx-translate/core";
import {PlanetsOverallStatsModule} from "./modules/planets-overall-stats/planets-overall-stats.module";
import {StatsPanelComponent} from "./modules/planets-overall-stats/component/stats-panel/stats-panel.component";

@NgModule({
  imports: [
    BrowserModule,
    RouterLink,
    RouterLinkActive,
    TranslateModule,
    PlanetsOverallStatsModule
  ],
  providers: [],
  bootstrap: [StatsPanelComponent]
})
export class AppModule {
  constructor() {
    console.log('----------------------------------------------------------------');
    console.log('---------------------- DarkGalaxy Toolbox ----------------------');
    console.log('----------------------------------------------------------------');
    console.log('------------------------ Main Features: ------------------------');
    console.log('----- 1. Fix styling glitches ----------------------------------');
    console.log('----- 2. Provide a modern alternative to the game navbar  ------');
    console.log('----------------------------------------------------------------');
  }
}
