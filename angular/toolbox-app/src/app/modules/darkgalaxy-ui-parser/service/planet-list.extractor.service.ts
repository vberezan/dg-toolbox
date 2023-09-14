import {Injectable} from '@angular/core';
import {PlanetSummary} from "../../../model/planet-list/planet-summary.planet-list-model";
import {Resource} from "../../../model/resource.model";
import {DataExtractor} from "./data-extractor";

@Injectable({
  providedIn: 'root'
})
export class PlanetListExtractorService implements DataExtractor {
  // TODO: use textContent instead of innerHTML

  extract(): PlanetSummary[] {
    let result: PlanetSummary[] = [];

    document.querySelectorAll('#planetList > #planetList').forEach((planet: Element) => {
      let planetSummary: PlanetSummary = new PlanetSummary();

      // -- set resources data
      let resourcesDOMNodes: NodeList = planet.querySelectorAll('.resourceLine .left > span');
      let resources: Resource[] = [];

      resourcesDOMNodes.forEach((value) => {
        let resourceParts: string[] = value.textContent.split(/\s+/);
        let resource: Resource = new Resource();

        resource.name = value.parentElement.className.split(/\s+/)[2];
        resource.stored = parseInt(resourceParts[0].replace(/,/g, ''));
        resource.production = parseInt(resourceParts[1].substring(1, resourceParts[1].length - 1).replace(/,/g, ''));
        resource.abundance = parseInt(resourceParts[2].replace(/,/g, ''));

        resources.push(resource);
      });
      planetSummary.resources = resources;

      // -- set population data
      let availableWorkers = planet.querySelectorAll('.planetHeadSection .resource span')[4].innerHTML.split(/\s+/)[0];
      planetSummary.workers.available = parseInt(availableWorkers.substring(1, availableWorkers.length).replace(/,/g, ''));
      planetSummary.workers.currentNumber = parseInt(planet.querySelectorAll('.planetHeadSection .resource span')[3].innerHTML.split(/\//g)[0].replace(/,/g, ''));
      planetSummary.workers.maximumNumber = parseInt(planet.querySelectorAll('.planetHeadSection .resource span')[3].innerHTML.split(/\//g)[1].replace(/,/g, ''));
      planetSummary.soldiers.currentNumber = parseInt(planet.querySelectorAll('.planetHeadSection .resource span')[2].innerHTML.replace(/,/g, ''));

      // -- set additional data
      planetSummary.name = planet.querySelectorAll('.planetName > a')[0].innerHTML;
      planetSummary.location = planet.querySelectorAll('.coords > span')[0].innerHTML.split(/\./);
      planetSummary.orbit = parseInt(planet.querySelectorAll('.planetHeadSection .resource span')[0].innerHTML);
      planetSummary.ground = parseInt(planet.querySelectorAll('.planetHeadSection .resource span')[1].innerHTML);

      result.push(planetSummary);
    });

    return result;
  }
}
