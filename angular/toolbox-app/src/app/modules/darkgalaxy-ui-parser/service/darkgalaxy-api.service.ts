import {inject, Injectable, Optional} from '@angular/core';
import {PlanetListExtractorService} from "./planet-list.extractor.service";
import {PlanetSummary} from "../../../shared/model/planets/planet-summary.planet-list-model";
import {PlanetScanExtractorService} from "./planet-scan.extractor.service";
import {PlanetScanEvent} from "../../../shared/model/scans/planet-scan-event.model";
import {NavigationSystemPlanetsExtractorService} from "./navigation-system-planets.extractor.service";
import {FleetScanExtractorService} from "./fleet-scan.extractor.service";
import {Fleet} from "../../../shared/model/fleet/fleet.model";

@Injectable({
  providedIn: 'platform'
})
export class DarkgalaxyApiService {

  private planetListExtractor: PlanetListExtractorService = inject(PlanetListExtractorService);
  private planetScanExtractor: PlanetScanExtractorService = inject(PlanetScanExtractorService);
  private navigationSystemPlanetsExtractor: NavigationSystemPlanetsExtractorService = inject(NavigationSystemPlanetsExtractorService);
  private fleetScanExtractor: FleetScanExtractorService = inject(FleetScanExtractorService);

  private cachedUsername: string = null;

  planetsSummaries(): PlanetSummary[] {
    return this.planetListExtractor.extract();
  }

  planetScan(): PlanetScanEvent {
    return this.planetScanExtractor.extract();
  }

  fleetScan(): Fleet[] {
    return this.fleetScanExtractor.extract();
  }

  navigationSystemPlanets(): PlanetSummary[] {
    return this.navigationSystemPlanetsExtractor.extract();
  }

  gameTurn(): number {
    return parseInt(document.querySelector('#turnNumber').textContent.trim().replace(/,/g, ''));
  }

  getCountDownMinutes(): number {
    return parseInt(document.querySelector('#countdownField').textContent.trim().split(/:/)[0]);
  }

  username(@Optional() lowercase: boolean = true): string {
    if (this.cachedUsername == null || !lowercase) {
      let completeName: string = document.querySelector('#header>#playerBox>.header>div.left:nth-child(2)').textContent.split('Welcome')[1].trim();

      if (completeName.indexOf('[') == 0 && completeName.indexOf(']') == 4) {
        completeName = completeName.substring(5, completeName.length);
      }

      if (lowercase) {
        this.cachedUsername = completeName.toLowerCase();
      }

      return completeName;
    }

    return this.cachedUsername;
  }

}
