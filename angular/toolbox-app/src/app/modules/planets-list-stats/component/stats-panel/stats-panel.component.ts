import {Component, inject, OnInit} from '@angular/core';
import {StatsPanel} from "../../../darkgalaxy-ui-parser/model/planet-list/planet-list-stats-panel.model";
import {StatsPanelService} from "../../service/stats-panel/stats-panel.service";

@Component({
    selector: 'dg-toolbox-stats-panel',
    templateUrl: './stats-panel.component.html',
    styleUrls: ['./stats-panel.component.css']
})
export class StatsPanelComponent implements OnInit {
    private statsPanelService : StatsPanelService = inject(StatsPanelService);
    protected panel: StatsPanel;

    ngOnInit() {
        this.panel = this.statsPanelService.extractStats();
    }

}
