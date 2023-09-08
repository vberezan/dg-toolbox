import {inject, Injectable} from '@angular/core';
import {PlanetListExtractorService} from "./planet-list.extractor.service";
import {PlanetSummary} from "../../../model/planet-list/planet-summary.planet-list-model";
import {PlanetScanExtractorService} from "./planet-scan.extractor.service";
import {PlanetScanEvent} from "../../../model/shared-scans/shared-scans-planet-scan-event.model";
import {NavigationSystemPlanetsExtractorService} from "./navigation-system-planets.extractor.service";

@Injectable({
  providedIn: 'platform'
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
}
