import {inject, Inject, Injectable} from '@angular/core';
import {PlanetListService} from "./planet/planet-list.service";
import {PlanetSummary} from "../model/planet-summary.model";

@Injectable({
    providedIn: 'root'
})
export class DarkGalaxyAPIService {

    private planetListService : PlanetListService = inject(PlanetListService);

    planetsSummaries(): PlanetSummary[] {
        return this.planetListService.extractPlanetsSummaries();
    }
}
