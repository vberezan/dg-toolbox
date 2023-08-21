import {AfterViewInit, Component, inject, Inject, OnInit} from '@angular/core';
import {DOCUMENT} from "@angular/common";
import {DarkGalaxyAPIService} from "../../../original-ui-parser/service/dark-galaxy-api.service";
import {PlanetSummary} from "../../../original-ui-parser/model/planet-summary.model";
import {StatsPanel} from "../../../original-ui-parser/model/stats-panel/stats-panel.model";
import {Resource} from "../../../original-ui-parser/model/resource.model";
import {ResourceTotals} from "../../../original-ui-parser/model/stats-panel/resource-totals.model";

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
        stats.resourceTotals.set('all', new ResourceTotals());

        planets.forEach((planet : PlanetSummary) => {
            if (!stats.resourceTotals.has(planet.location[0])) {
                stats.resourceTotals.set(planet.location[0], new ResourceTotals());
            }

            stats.resourceTotals.get('all').totalGround += planet.ground;
            stats.resourceTotals.get(planet.location[0]).totalGround += planet.ground;

            stats.resourceTotals.get('all').totalOrbit += planet.orbit;
            stats.resourceTotals.get(planet.location[0]).totalOrbit += planet.orbit;

            planet.resources.forEach((resource : Resource) => {
                switch (resource.name) {
                    case 'metal': {
                        stats.resourceTotals.get('all').totalMetal += resource.quantity;
                        stats.resourceTotals.get(planet.location[0]).totalMetal += resource.quantity;

                        break;
                    }
                    case 'mineral': {
                        stats.resourceTotals.get('all').totalMineral += resource.quantity;
                        stats.resourceTotals.get(planet.location[0]).totalMineral += resource.quantity;

                        break;
                    }
                    case 'food': {
                        stats.resourceTotals.get('all').totalFood += resource.quantity;
                        stats.resourceTotals.get(planet.location[0]).totalFood += resource.quantity;

                        break;
                    }
                    case 'energy': {
                        stats.resourceTotals.get('all').totalEnergy += resource.quantity;
                        stats.resourceTotals.get(planet.location[0]).totalEnergy += resource.quantity;

                        break;
                    }
                }
            })
        })

        return stats;
    }

}
