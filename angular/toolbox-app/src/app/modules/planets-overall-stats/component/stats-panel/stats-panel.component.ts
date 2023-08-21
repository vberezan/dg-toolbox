import {AfterViewInit, Component, inject, Inject, OnInit} from '@angular/core';
import {DOCUMENT} from "@angular/common";
import {DarkGalaxyAPIService} from "../../../original-ui-parser/service/dark-galaxy-api.service";
import {PlanetSummary} from "../../../original-ui-parser/model/planet-summary.model";
import {StatsPanel} from "../../../original-ui-parser/model/stats-panel.model";
import {Resource} from "../../../original-ui-parser/model/resource.model";

@Component({
    selector: 'dg-toolbox-stats-panel',
    templateUrl: './stats-panel.component.html',
    styleUrls: ['./stats-panel.component.css']
})
export class StatsPanelComponent implements AfterViewInit, OnInit {
    private uiAPI: DarkGalaxyAPIService = inject(DarkGalaxyAPIService);
    protected stats: StatsPanel;

    ngOnInit() {
        let planets: PlanetSummary[] = this.uiAPI.planetsSummaries();
        this.stats = this.extractStats(planets);
        console.log(this.stats);
    }

    ngAfterViewInit(): void {
    }

    private extractStats(planets: PlanetSummary[]): StatsPanel  {
        let stats: StatsPanel = new StatsPanel();

        planets.forEach((planet : PlanetSummary) => {
            stats.totalGround += planet.ground;
            stats.totalOrbit += planet.orbit;

            planet.resources.forEach((resource : Resource) => {
                switch (resource.name) {
                    case 'metal': stats.totalMetal += resource.quantity; break;
                    case 'mineral': stats.totalMineral += resource.quantity; break;
                    case 'food': stats.totalFood += resource.quantity; break;
                    case 'energy': stats.totalEnergy += resource.quantity; break;
                }
            })
        })

        return stats;
    }

}
