import {Component, inject, OnInit} from '@angular/core';
import {DarkGalaxyAPIService} from "../../../original-ui-parser/service/dark-galaxy-api.service";
import {PlanetSummary} from "../../../original-ui-parser/model/planet-list/planet-summary.model";
import {StatsPanel} from "../../../original-ui-parser/model/planet-list/stats-panel/stats-panel.model";
import {Resource} from "../../../original-ui-parser/model/planet-list/base/resource.model";
import {ResourceStats} from "../../../original-ui-parser/model/planet-list/stats-panel/stats/resource-stats.model";
import {PlanetStats} from "../../../original-ui-parser/model/planet-list/stats-panel/stats/planet-stats.model";

@Component({
    selector: 'dg-toolbox-stats-panel',
    templateUrl: './stats-panel.component.html',
    styleUrls: ['./stats-panel.component.css']
})
export class StatsPanelComponent implements OnInit {
    private uiAPI: DarkGalaxyAPIService = inject(DarkGalaxyAPIService);
    protected statsPanel: StatsPanel;
    ngOnInit() {
        let planets: PlanetSummary[] = this.uiAPI.planetsSummaries();
        this.statsPanel = this.extractStats(planets);
    }

    generateRandom(): number {
        return Math.floor(100000 * Math.random());
    }

    private extractStats(planets: PlanetSummary[]): StatsPanel  {
        let statsPanel: StatsPanel = new StatsPanel();
        statsPanel.stats.set('all', new PlanetStats());

        planets.forEach((planet : PlanetSummary) => {
            if (!statsPanel.stats.has(planet.location[0])) {
                statsPanel.stats.set(planet.location[0], new PlanetStats());
            }

            statsPanel.stats.get('all').workers.total += planet.worker.currentNumber;
            statsPanel.stats.get(planet.location[0]).workers.total += planet.worker.currentNumber;
            statsPanel.stats.get('all').workers.maximum += planet.worker.maximumNumber;
            statsPanel.stats.get(planet.location[0]).workers.maximum += planet.worker.maximumNumber;
            statsPanel.stats.get('all').soldiers.total += planet.soldier.currentNumber;
            statsPanel.stats.get(planet.location[0]).soldiers.total += planet.soldier.currentNumber;

            statsPanel.stats.get('all').resources.ground += planet.ground;
            statsPanel.stats.get(planet.location[0]).resources.ground += planet.ground;

            statsPanel.stats.get('all').resources.orbit += planet.orbit;
            statsPanel.stats.get(planet.location[0]).resources.orbit += planet.orbit;

            planet.resources.forEach((resource : Resource) => {
                switch (resource.name) {
                    case 'metal': {
                        statsPanel.stats.get('all').resources.metal += resource.quantity;
                        statsPanel.stats.get(planet.location[0]).resources.metal += resource.quantity;

                        break;
                    }
                    case 'mineral': {
                        statsPanel.stats.get('all').resources.mineral += resource.quantity;
                        statsPanel.stats.get(planet.location[0]).resources.mineral += resource.quantity;

                        break;
                    }
                    case 'food': {
                        statsPanel.stats.get('all').resources.food += resource.quantity;
                        statsPanel.stats.get(planet.location[0]).resources.food += resource.quantity;

                        break;
                    }
                    case 'energy': {
                        statsPanel.stats.get('all').resources.energy += resource.quantity;
                        statsPanel.stats.get(planet.location[0]).resources.energy += resource.quantity;

                        break;
                    }
                }
            })
        })

        return statsPanel;
    }

}
