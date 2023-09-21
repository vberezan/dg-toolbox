import {Injectable} from '@angular/core';
import {DataExtractor} from "./data-extractor";
import {PlanetSummary} from "../../../shared/model/planets/planet-summary.planet-list-model";

@Injectable({
  providedIn: 'root'
})
export class NavigationSystemPlanetsExtractorService implements DataExtractor {
  extract(): PlanetSummary[] {
    let result: PlanetSummary[] = [];

    document.querySelectorAll('div.navigation div.planets').forEach((planet: Element) => {
      let summary: PlanetSummary = new PlanetSummary();
      summary.location = planet.querySelector('.coords>span').textContent.trim().split(/\./);

      result.push(summary);
    })

    return result;
  }
}
