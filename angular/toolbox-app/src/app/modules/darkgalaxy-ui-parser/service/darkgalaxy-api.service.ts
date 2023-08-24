import {inject, Injectable} from '@angular/core';
import {PlanetListExtractorService} from "./planet-list.extractor.service";
import {PlanetSummary} from "../model/planet-list/planet-list-planet-summary.model";
import {PlanetScan} from "../../scans-in-cloud/model/planet-scan.model";
import {PlanetScanExtractorService} from "./planet-scan.extractor.service";
import {PlanetScanEvent} from "../../scans-in-cloud/model/planet-scan-event.model";

@Injectable({
  providedIn: 'platform'
})
export class DarkgalaxyApiService {

  private planetListExtractor: PlanetListExtractorService = inject(PlanetListExtractorService);
  private planetScanExtractor: PlanetScanExtractorService = inject(PlanetScanExtractorService);

  planetsSummaries(): PlanetSummary[] {
    return this.planetListExtractor.extract();
  }

  planetScan(): PlanetScanEvent {
    return this.planetScanExtractor.extract();
  }
}
