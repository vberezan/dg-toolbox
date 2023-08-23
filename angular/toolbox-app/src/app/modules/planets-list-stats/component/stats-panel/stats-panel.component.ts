import {Component, inject, OnInit} from '@angular/core';
import {StatsPanel} from "../../../darkgalaxy-ui-parser/model/planet-list/planet-list-stats-panel.model";
import {StatsPanelService} from "../../service/stats-panel/stats-panel.service";
import {FaIconLibrary} from "@fortawesome/angular-fontawesome";
import {
    faBolt as fasBolt,
    faCoins as fasCoins,
    faSatellite as fasSatellite,
    faUtensils as fasUtensils,
    faTreeCity as fasTreeCity
} from "@fortawesome/free-solid-svg-icons";
import {faGem as farGem} from "@fortawesome/free-regular-svg-icons";

@Component({
    selector: 'dg-toolbox-stats-panel',
    templateUrl: './stats-panel.component.html',
    styleUrls: ['./stats-panel.component.css']
})
export class StatsPanelComponent implements OnInit {
    private statsPanelService: StatsPanelService = inject(StatsPanelService);
    protected panel: StatsPanel;

    constructor(library: FaIconLibrary) {
        library.addIcons(farGem, fasUtensils, fasCoins, fasBolt, fasSatellite, fasTreeCity);
    }

    ngOnInit() {
        this.panel = this.statsPanelService.extractStats();
    }

}
