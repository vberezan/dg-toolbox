import {inject, Injectable} from '@angular/core';
import {PlanetListExtractorService} from "./planet-list.extractor.service";
import {PlanetSummary} from "../../../model/planets/planet-summary.planet-list-model";
import {PlanetScanExtractorService} from "./planet-scan.extractor.service";
import {PlanetScanEvent} from "../../../model/scans/shared-scans-planet-scan-event.model";
import {NavigationSystemPlanetsExtractorService} from "./navigation-system-planets.extractor.service";

@Injectable({
  providedIn: 'root'
})
export class DarkgalaxyApiService {

  private planetListExtractor: PlanetListExtractorService = inject(PlanetListExtractorService);
  private planetScanExtractor: PlanetScanExtractorService = inject(PlanetScanExtractorService);
  private navigationSystemPlanetsExtractor: NavigationSystemPlanetsExtractorService = inject(NavigationSystemPlanetsExtractorService);

  planetsSummaries(): PlanetSummary[] {
    return this.planetListExtractor.extract();
  }

  planetScan(): PlanetScanEvent {
    return this.planetScanExtractor.extract();
  }

  navigationSystemPlanets(): PlanetSummary[] {
    return this.navigationSystemPlanetsExtractor.extract();
  }

  gameTurn(): number {
    return parseInt(document.querySelector('#turnNumber').textContent.trim().replace(/,/g, ''));
  }

  getUser(): string {
    let completeName = document.querySelector('#header>#playerBox>.header>div.left:nth-child(2)').textContent.split('Welcome')[1].trim();

    if (completeName.indexOf('[') == 0 && completeName.indexOf(']') == 4) {
      completeName = completeName.substring(5, completeName.length);
    }

    return completeName.toLowerCase();
  }
}
