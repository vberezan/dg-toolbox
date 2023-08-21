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
            panel.stats.get('all').resources.metal += resource.quantity;
            panel.stats.get(planetSummary.location[0]).resources.metal += resource.quantity;

            break;
          }
          case 'mineral': {
            panel.stats.get('all').resources.mineral += resource.quantity;
            panel.stats.get(planetSummary.location[0]).resources.mineral += resource.quantity;

            break;
          }
          case 'food': {
            panel.stats.get('all').resources.food += resource.quantity;
            panel.stats.get(planetSummary.location[0]).resources.food += resource.quantity;

            break;
          }
          case 'energy': {
            panel.stats.get('all').resources.energy += resource.quantity;
            panel.stats.get(planetSummary.location[0]).resources.energy += resource.quantity;

            break;
          }
        }
      })
    })

    return panel;
  }
}
