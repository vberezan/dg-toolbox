import {inject, Injectable} from '@angular/core';
import {DarkgalaxyApiService} from "../../../darkgalaxy-ui-parser/service/darkgalaxy-api.service";
import {PlanetSummary} from "../../../darkgalaxy-ui-parser/model/planet-list/planet-list-planet-summary.model";
import {StatsPanel} from "../../../darkgalaxy-ui-parser/model/planet-list/planet-list-stats-panel.model";
import {PlanetStats} from "../../../darkgalaxy-ui-parser/model/planet-list/planet-list-planet-stats.model";
import {Resource} from "../../../darkgalaxy-ui-parser/model/common/resource.model";

@Injectable({
  providedIn: 'root'
})
export class StatsPanelService {
  private dgAPI: DarkgalaxyApiService = inject(DarkgalaxyApiService);

  public extractStats(): StatsPanel  {
    let panel: StatsPanel = new StatsPanel();
    panel.stats.set('all', new PlanetStats());

    this.dgAPI.planetsSummaries().forEach((planetSummary : PlanetSummary) => {
      if (!panel.stats.has(planetSummary.location[0])) {
        panel.stats.set(planetSummary.location[0], new PlanetStats());
      }

      panel.stats.get('all').workers.total += planetSummary.workers.currentNumber;
      panel.stats.get(planetSummary.location[0]).workers.total += planetSummary.workers.currentNumber;
      panel.stats.get('all').workers.maximum += planetSummary.workers.maximumNumber;
      panel.stats.get(planetSummary.location[0]).workers.maximum += planetSummary.workers.maximumNumber;
      panel.stats.get('all').soldiers.total += planetSummary.soldiers.currentNumber;
      panel.stats.get(planetSummary.location[0]).soldiers.total += planetSummary.soldiers.currentNumber;

      panel.stats.get('all').resources.ground += planetSummary.ground;
      panel.stats.get(planetSummary.location[0]).resources.ground += planetSummary.ground;

      panel.stats.get('all').resources.orbit += planetSummary.orbit;
      panel.stats.get(planetSummary.location[0]).resources.orbit += planetSummary.orbit;

      planetSummary.resources.forEach((resource : Resource) => {
        switch (resource.name) {
          case 'metal': {
            panel.stats.get('all').resources.metalQuantity += resource.quantity;
            panel.stats.get('all').resources.metalProduction += resource.production;
            panel.stats.get(planetSummary.location[0]).resources.metalQuantity += resource.quantity;
            panel.stats.get(planetSummary.location[0]).resources.metalProduction += resource.production;

            break;
          }
          case 'mineral': {
            panel.stats.get('all').resources.mineralQuantity += resource.quantity;
            panel.stats.get('all').resources.mineralProduction += resource.production;
            panel.stats.get(planetSummary.location[0]).resources.mineralQuantity += resource.quantity;
            panel.stats.get(planetSummary.location[0]).resources.mineralProduction += resource.production;

            break;
          }
          case 'food': {
            panel.stats.get('all').resources.foodQuantity += resource.quantity;
            panel.stats.get('all').resources.foodProduction += resource.production;
            panel.stats.get(planetSummary.location[0]).resources.foodQuantity += resource.quantity;
            panel.stats.get(planetSummary.location[0]).resources.foodProduction += resource.production;

            break;
          }
          case 'energy': {
            panel.stats.get('all').resources.energyQuantity += resource.quantity;
            panel.stats.get('all').resources.energyProduction += resource.production;
            panel.stats.get(planetSummary.location[0]).resources.energyQuantity += resource.quantity;
            panel.stats.get(planetSummary.location[0]).resources.energyProduction += resource.production;

            break;
          }
        }
      })
    })

    return panel;
  }
}
