import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StatsPanelComponent} from './component/stats-panel/stats-panel.component';
import {BrowserModule} from "@angular/platform-browser";
import {GalaxyNameFormatterPipe} from './pipe/galaxy-name-formatter.pipe';

@NgModule({
    declarations: [
        StatsPanelComponent,
        GalaxyNameFormatterPipe
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
