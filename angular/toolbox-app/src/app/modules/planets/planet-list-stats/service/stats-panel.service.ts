import {inject, Injectable} from '@angular/core';
import {DarkgalaxyApiService} from "../../../darkgalaxy-ui-parser/service/darkgalaxy-api.service";
import {PlanetSummary} from "../../../../shared/model/planets/planet-summary.planet-list-model";
import {StatsPanel} from "../../../../shared/model/planets/planet-list-stats-panel.model";
import {PlanetStats} from "../../../../shared/model/planets/planet-list-planet-stats.model";
import {Resource} from "../../../../shared/model/resource.model";
import {Resources} from "../../../../shared/model/resources";

@Injectable({
  providedIn: 'root'
})
export class StatsPanelService {
  private dgAPI: DarkgalaxyApiService = inject(DarkgalaxyApiService);

  public extractStats(): StatsPanel {
    let panel: StatsPanel = new StatsPanel();
    panel.stats.set(Resources.ALL, new PlanetStats());

    this.dgAPI.planetsSummaries().forEach((planetSummary: PlanetSummary): void => {
      if (!panel.stats.has(planetSummary.location[0])) {
        panel.stats.set(planetSummary.location[0], new PlanetStats());
      }

      panel.stats.get(Resources.ALL).count++;
      panel.stats.get(planetSummary.location[0]).count++;

      panel.stats.get(Resources.ALL).workers.total += planetSummary.workers.currentNumber;
      panel.stats.get(planetSummary.location[0]).workers.total += planetSummary.workers.currentNumber;
      panel.stats.get(Resources.ALL).workers.maximum += planetSummary.workers.maximumNumber;
      panel.stats.get(planetSummary.location[0]).workers.maximum += planetSummary.workers.maximumNumber;
      panel.stats.get(Resources.ALL).soldiers.total += planetSummary.soldiers.currentNumber;
      panel.stats.get(planetSummary.location[0]).soldiers.total += planetSummary.soldiers.currentNumber;

      panel.stats.get(Resources.ALL).resources.ground += planetSummary.ground;
      panel.stats.get(planetSummary.location[0]).resources.ground += planetSummary.ground;

      panel.stats.get(Resources.ALL).resources.orbit += planetSummary.orbit;
      panel.stats.get(planetSummary.location[0]).resources.orbit += planetSummary.orbit;

      planetSummary.resources.forEach((resource: Resource) : void => {
        switch (resource.name) {
          case Resources.METAL: {
            panel.stats.get(Resources.ALL).resources.metalStored += resource.stored;
            panel.stats.get(Resources.ALL).resources.metalProduction += resource.production;
            panel.stats.get(planetSummary.location[0]).resources.metalStored += resource.stored;
            panel.stats.get(planetSummary.location[0]).resources.metalProduction += resource.production;

            break;
          }
          case Resources.MINERAL: {
            panel.stats.get(Resources.ALL).resources.mineralStored += resource.stored;
            panel.stats.get(Resources.ALL).resources.mineralProduction += resource.production;
            panel.stats.get(planetSummary.location[0]).resources.mineralStored += resource.stored;
            panel.stats.get(planetSummary.location[0]).resources.mineralProduction += resource.production;

            break;
          }
          case Resources.FOOD: {
            panel.stats.get(Resources.ALL).resources.foodStored += resource.stored;
            panel.stats.get(Resources.ALL).resources.foodProduction += resource.production;
            panel.stats.get(planetSummary.location[0]).resources.foodStored += resource.stored;
            panel.stats.get(planetSummary.location[0]).resources.foodProduction += resource.production;

            break;
          }
          case Resources.ENERGY: {
            panel.stats.get(Resources.ALL).resources.energyStored += resource.stored;
            panel.stats.get(Resources.ALL).resources.energyProduction += resource.production;
            panel.stats.get(planetSummary.location[0]).resources.energyStored += resource.stored;
            panel.stats.get(planetSummary.location[0]).resources.energyProduction += resource.production;

            break;
          }
        }
      })
    })

    return panel;
  }
}
