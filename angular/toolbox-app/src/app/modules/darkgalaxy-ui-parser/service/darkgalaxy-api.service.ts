import {inject, Injectable} from '@angular/core';
import {PlanetListService} from "./planet-list/planet-list.service";
import {PlanetSummary} from "../model/planet-list/planet-list-planet-summary.model";

@Injectable({
  providedIn: 'root'
})
export class DarkgalaxyApiService {

  private planetListService: PlanetListService = inject(PlanetListService);

  planetsSummaries(): PlanetSummary[] {
    return this.planetListService.extractPlanetsSummaries();
  }
}
