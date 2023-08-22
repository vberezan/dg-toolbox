import {NgModule} from '@angular/core';
import {CommonModule, DecimalPipe} from '@angular/common';
import {StatsPanelComponent} from './component/stats-panel/stats-panel.component';
import {BrowserModule} from "@angular/platform-browser";
import {GalaxyNameFormatterPipe} from './pipe/galaxy-name-formatter.pipe';
import {ResourceFormatterPipe} from './pipe/resource-formatter.pipe';

@NgModule({
    declarations: [
        StatsPanelComponent,
        GalaxyNameFormatterPipe,
        ResourceFormatterPipe
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
