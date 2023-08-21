import {inject, Injectable} from '@angular/core';
import {DOCUMENT} from "@angular/common";
import {PlanetSummary} from "../../model/planet-summary.model";
import {Resource} from "../../model/resource.model";

@Injectable({
    providedIn: 'root'
})
export class PlanetListService {

    private document: any = inject(DOCUMENT);

    extractPlanetsSummaries(): PlanetSummary[] {
        let summaries: PlanetSummary[] = [];

        this.document.querySelectorAll('#planetList > #planetList').forEach((planet: Document) => {
            let summary: NodeList = planet.querySelectorAll('.resourceLine .left > span');
            let resources: Resource[] = [];

            summary.forEach((value) => {

                let parts: string[] = value.textContent.split(/\s+/);
                let resource: Resource = new Resource(
                    value.parentElement.className.split(/\s+/)[2],
                    parseInt(parts[0].replace(/,/g, '')),
                    parseInt(parts[1].substring(1, parts[1].length - 1).replace(/,/g, '')),
                    parseInt(parts[2].replace(/,/g, ''))
                );

                resources.push(resource);
                ``
            });

            let name: string = planet.querySelectorAll('.planetName > a')[0].innerHTML;
            let location: string[] = planet.querySelectorAll('.coords > span')[0].innerHTML.split(/\./);
            let orbit = parseInt(planet.querySelectorAll('.planetName')[0].nextElementSibling.querySelector('span').innerText);
            let ground = parseInt(planet.querySelectorAll('.planetName')[0].nextElementSibling.nextElementSibling.querySelector('span').innerText);

            summaries.push(new PlanetSummary(name, resources, ground, orbit, location));

        });

        return summaries;
    }
}
