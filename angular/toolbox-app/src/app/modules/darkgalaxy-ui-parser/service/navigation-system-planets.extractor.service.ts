import {inject, Injectable} from '@angular/core';
import {DataExtractor} from "./data-extractor";
import {PlanetSummary} from "../../../model/planet-list/planet-summary.planet-list-model";
import {DOCUMENT} from "@angular/common";

@Injectable({
  providedIn: 'platform'
})
export class NavigationSystemPlanetsExtractorService implements DataExtractor {
  private document: any = inject(DOCUMENT);

  constructor() { }

  extract(): PlanetSummary[] {
    let result: PlanetSummary[] = [];

    this.document.querySelectorAll('div.navigation div.planets').forEach((planet: Element) => {
      let summary: PlanetSummary = new PlanetSummary();
      summary.location = planet.querySelector('.coords>span').textContent.trim().split(/\./);

      result.push(summary);
    })

    return result;
  }
}
