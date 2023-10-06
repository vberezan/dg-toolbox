import {inject, Injectable, Optional} from '@angular/core';
import {PlanetListExtractorService} from "./planet-list.extractor.service";
import {PlanetSummary} from "../../../shared/model/planets/planet-summary.planet-list-model";
import {PlanetScanExtractorService} from "./planet-scan.extractor.service";
import {PlanetScanEvent} from "../../../shared/model/scans/shared-scans-planet-scan-event.model";
import {NavigationSystemPlanetsExtractorService} from "./navigation-system-planets.extractor.service";
import {AllianceMembersService} from "./alliance-members.service";
import {AllianceMember} from "../../../shared/model/orders/alliance-member.model";

@Injectable({
  providedIn: 'platform'
})
export class DarkgalaxyApiService {

  private planetListExtractor: PlanetListExtractorService = inject(PlanetListExtractorService);
  private planetScanExtractor: PlanetScanExtractorService = inject(PlanetScanExtractorService);
  private navigationSystemPlanetsExtractor: NavigationSystemPlanetsExtractorService = inject(NavigationSystemPlanetsExtractorService);
  private allianceMembersExtractor: AllianceMembersService = inject(AllianceMembersService);

  private cachedUsername: string = null;

  planetsSummaries(): PlanetSummary[] {
    return this.planetListExtractor.extract();
  }

  planetScan(): PlanetScanEvent {
    return this.planetScanExtractor.extract();
  }

  navigationSystemPlanets(): PlanetSummary[] {
    return this.navigationSystemPlanetsExtractor.extract();
  }

  allianceMembers(clean: boolean | false): AllianceMember[] {
    let result: AllianceMember[] = this.allianceMembersExtractor.extract();

    if (clean) {
      this.allianceMembersExtractor.cleanAfterExtract();
    }

    return result;
  }

  gameTurn(): number {
    return parseInt(document.querySelector('#turnNumber').textContent.trim().replace(/,/g, ''));
  }

  username(@Optional() lowercase: boolean = true): string {
    if (this.cachedUsername == null) {
      let completeName = document.querySelector('#header>#playerBox>.header>div.left:nth-child(2)').textContent.split('Welcome')[1].trim();

      if (completeName.indexOf('[') == 0 && completeName.indexOf(']') == 4) {
        completeName = completeName.substring(5, completeName.length);
      }

      if (lowercase) {
        this.cachedUsername = completeName.toLowerCase();
      }
    }

    return this.cachedUsername;
  }

}
