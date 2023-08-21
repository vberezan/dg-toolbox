import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StatsPanelComponent} from './component/stats-panel/stats-panel.component';


@NgModule({
    declarations: [
        StatsPanelComponent
    ],
    exports: [
        StatsPanelComponent
    ],
    imports: [
        CommonModule
    ]
})
export class PlanetsOverallStatsModule {
}
