import {NgModule} from '@angular/core';
import {CommonModule, DecimalPipe} from '@angular/common';
import {StatsPanelComponent} from './component/stats-panel/stats-panel.component';
import {BrowserModule} from "@angular/platform-browser";
import {GalaxyNameFormatterPipe} from './pipe/galaxy-name-formatter.pipe';
import { ResourceProductionFormatterPipe } from './pipe/resource-production-formatter.pipe';

@NgModule({
    declarations: [
        StatsPanelComponent,
        GalaxyNameFormatterPipe,
        ResourceProductionFormatterPipe
    ],
    providers: [
      DecimalPipe
    ],
    imports: [
        CommonModule,
        BrowserModule
    ],
    exports: [
        StatsPanelComponent
    ]
})
export class PlanetsListStatsModule {
}
