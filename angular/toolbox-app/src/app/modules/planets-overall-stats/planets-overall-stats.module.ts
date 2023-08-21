import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StatsPanelComponent} from './component/stats-panel/stats-panel.component';
import {BrowserModule} from "@angular/platform-browser";
import {GalaxyNamePipe} from './pipe/galaxy-name.pipe';


@NgModule({
    declarations: [
        StatsPanelComponent,
        GalaxyNamePipe
    ],
    exports: [
        StatsPanelComponent
    ],
    imports: [
        CommonModule,
        BrowserModule
    ]
})
export class PlanetsOverallStatsModule {
}
