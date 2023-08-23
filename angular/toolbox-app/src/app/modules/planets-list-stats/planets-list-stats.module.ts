import {NgModule} from '@angular/core';
import {DecimalPipe} from '@angular/common';
import {StatsPanelComponent} from './component/stats-panel/stats-panel.component';
import {GalaxyNameFormatterPipe} from './pipe/galaxy-name-formatter.pipe';
import {ResourceProductionFormatterPipe} from './pipe/resource-production-formatter.pipe';
import {RouterLink, RouterLinkActive, RouterModule} from "@angular/router";
import {BrowserModule} from "@angular/platform-browser";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";

@NgModule({
    imports: [
        BrowserModule,
        RouterLink,
        RouterLinkActive,
        RouterModule,
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
}
