import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {RouterLink, RouterLinkActive} from "@angular/router";
import {TranslateModule} from "@ngx-translate/core";
import {PlanetsListStatsModule} from "./modules/planets-list-stats/planets-list-stats.module";
import {StatsPanelComponent} from "./modules/planets-list-stats/component/stats-panel/stats-panel.component";

@NgModule({
    imports: [
        BrowserModule,
        RouterLink,
        RouterLinkActive,
        TranslateModule,
        PlanetsListStatsModule
    ],
    providers: [],
    bootstrap: [StatsPanelComponent]
})
export class AppModule {
    constructor() {
        console.log("%cDarkGalaxy Toolbox", "font-size: 14px");
        console.log('%c• fix styling glitches (new)', "font-size: 10px;");
        console.log('%c• planets list statistics:', "font-size: 10px;");
        console.log('%c• total resources', "font-size: 10px; margin-left: 25px;");
        console.log('%c• per galaxy resources (new)', "font-size: 10px; margin-left: 25px;");
    }
}
