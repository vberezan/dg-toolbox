import {inject, Injectable} from '@angular/core';
import {DOCUMENT} from "@angular/common";
import {PlanetSummary} from "../../model/planet-list/planet-summary.model";
import {Resource} from "../../model/planet-list/base/resource.model";
import {Population} from "../../model/planet-list/base/population.model";

@Injectable({
    providedIn: 'root'
})
export class PlanetListService {

    private document: any = inject(DOCUMENT);

    extractPlanetsSummaries(): PlanetSummary[] {
        let summaries: PlanetSummary[] = [];

        this.document.querySelectorAll('#planetList > #planetList').forEach((planet: Document) => {
            let planetSummary: PlanetSummary = new PlanetSummary();

            // -- set resources data
            let resourcesDOMNodes: NodeList = planet.querySelectorAll('.resourceLine .left > span');
            let resources: Resource[] = [];
            resourcesDOMNodes.forEach((value) => {

                let resourceParts: string[] = value.textContent.split(/\s+/);
                let resource: Resource = new Resource();

                resource.name = value.parentElement.className.split(/\s+/)[2];
                resource.quantity = parseInt(resourceParts[0].replace(/,/g, ''));
                resource.abundance = parseInt(resourceParts[1].substring(1, resourceParts[1].length - 1).replace(/,/g, ''));
                resource.production = parseInt(resourceParts[2].replace(/,/g, ''));
                resources.push(resource);
            });
            planetSummary.resources = resources;

            // -- set population data
            planetSummary.worker.available = parseInt(planet.querySelectorAll('.planetHeadSection .resource span')[4].innerHTML.split(/\s+/)[0].replace(/[(,]/g,''));
            planetSummary.worker.currentNumber = parseInt(planet.querySelectorAll('.planetHeadSection .resource span')[3].innerHTML.split(/\//g)[0].replace(/,/g, ''));
            planetSummary.worker.maximumNumber = parseInt(planet.querySelectorAll('.planetHeadSection .resource span')[3].innerHTML.split(/\//g)[1].replace(/,/g, ''));
            planetSummary.soldier.currentNumber = parseInt(planet.querySelectorAll('.planetHeadSection .resource span')[2].innerHTML.replace(/,/g, ''));

            // -- set additional data
            planetSummary.name = planet.querySelectorAll('.planetName > a')[0].innerHTML;
            planetSummary.location = planet.querySelectorAll('.coords > span')[0].innerHTML.split(/\./);
            planetSummary.orbit = parseInt(planet.querySelectorAll('.planetHeadSection .resource span')[0].innerHTML);
            planetSummary.ground = parseInt(planet.querySelectorAll('.planetHeadSection .resource span')[1].innerHTML);

            summaries.push(planetSummary);
        });

        return summaries;
    }
}
