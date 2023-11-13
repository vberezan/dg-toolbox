import {Injectable} from '@angular/core';
import {DataExtractor} from "./data-extractor";
import {PlanetScan} from "../../../shared/model/scans/shared-scans-planet-scan.model";
import {ScanType} from "../../../shared/model/scan-type";
import {Resource} from "../../../shared/model/resource.model";
import {PlanetScanEvent} from "../../../shared/model/scans/shared-scans-planet-scan-event.model";
import {NameQuantity} from "../../../shared/model/name-quantity.model";
import {Structures} from "../../../shared/model/structures";
import {Owner} from "../../../shared/model/scans/shared-scans-owner.model";

@Injectable({
  providedIn: 'platform'
})
export class PlanetScanExtractorService implements DataExtractor {
  extract(): PlanetScanEvent {
    // -- no scan
    if (document.querySelectorAll('#contentBox #planetHeader').length <= 1) {
      return null;
    }

    let planetScan: PlanetScan = new PlanetScan();
    let base: Element = document.querySelectorAll('#contentBox #planetHeader')[1];
    let scanType: ScanType;

    document.querySelectorAll('input[name="scanId"]').forEach((input: Element, index: number): void => {
      if (input.hasAttribute('checked')) {
        switch (index) {
          case 0: {
            scanType = ScanType.RESOURCE;
            break;
          }
          case 1: {
            scanType = ScanType.SURFACE;
            break;
          }
          case 2: {
            scanType = ScanType.FLEET;
            break;
          }
          default:
            scanType = ScanType.UNKNOWN;
        }
      }
    })

    let result: PlanetScanEvent = new PlanetScanEvent(planetScan, scanType);

    if (scanType !== ScanType.UNKNOWN) {
      result.planetScan.turn = parseInt(document.querySelector('#turnNumber').textContent.trim().replace(/,/g, ''));

      let ownerAlliance: string = base.querySelectorAll('.planetHeadSection .opacBackground>.left>span')[1] ?
        base.querySelectorAll('.planetHeadSection .opacBackground>.left>span')[1].textContent.trim() : '[-]';

      let owner: string = base.querySelectorAll('.planetHeadSection .opacBackground>.left>span')[0].textContent.trim();

      if (owner !== 'This planet is unoccupied.') {
        result.planetScan.owner = new Owner(owner.split('Owner:')[1].trim(), '');
      } else {
        result.planetScan.owner = new Owner('Uninhabited Planet', ownerAlliance.substring(1, ownerAlliance.length - 1));
      }
    }

    // -- extract common RESOURCE & SURFACE scans data
    if (scanType === ScanType.RESOURCE || scanType === ScanType.SURFACE) {
      result.planetScan.orbit = parseInt(base.querySelectorAll('.planetHeadSection .resource > span')[0].textContent.trim());
      result.planetScan.ground = parseInt(base.querySelectorAll('.planetHeadSection .resource > span')[1].textContent.trim());
      result.planetScan.location = base.querySelectorAll('.planetHeadSection .coords')[0].textContent.trim().replace(/\s+/, '');

    }

    // -- extract RESOURCE specific data
    if (scanType === ScanType.RESOURCE) {
      base.querySelectorAll('.planetHeadSection .resourceRow:nth-child(1) > .data:not(:first-child)').forEach((name: Element) => {
        let resource: Resource = new Resource();
        resource.name = name.textContent.trim().toLowerCase();
        result.planetScan.resources.push(resource);
      });

      base.querySelectorAll('.planetHeadSection .resourceRow:nth-child(2) > .data:not(:first-child)').forEach((abundance: Element, index: number) => {
        result.planetScan.resources[index].abundance = parseInt(abundance.textContent.trim());
      });
    }

    // -- extract SURFACE specific data
    if (scanType === ScanType.SURFACE) {
      base.querySelectorAll('.planetHeadSection .resourceRow:nth-child(1) > .data:not(:first-child)').forEach((name: Element) => {
        let resource: Resource = new Resource();
        resource.name = name.textContent.trim().toLowerCase();
        result.planetScan.resources.push(resource);
      });

      base.querySelectorAll('.planetHeadSection .resourceRow:nth-child(2) > .data:not(:first-child)').forEach((production: Element, index: number) => {
        result.planetScan.resources[index].stored = parseInt(production.textContent.trim().replace(/,/g, ''));
      });

      base.querySelectorAll('.planetHeadSection .resourceRow:nth-child(3) > .data:not(:first-child)').forEach((abundance: Element, index: number) => {
        result.planetScan.resources[index].abundance = parseInt(abundance.textContent.trim());
      });

      let resources:NodeListOf<Element> = base.querySelectorAll('.planetHeadSection .resource > span');

      // -- check if the planet was not emptied
      if (resources.length > 4) {
        let availableWorkers: string = resources[4].textContent.trim().split(/\s+/)[0];
        result.planetScan.workers.available = parseInt(availableWorkers.substring(1, availableWorkers.length).replace(/,/g, ''));
        result.planetScan.workers.currentNumber = parseInt(resources[3].textContent.trim().split(/\//g)[0].replace(/,/g, ''));
        result.planetScan.workers.maximumNumber = parseInt(resources[3].textContent.trim().split(/\//g)[1].replace(/,/g, ''));
        result.planetScan.soldiers = parseInt(resources[2].textContent.trim().replace(/,/g, ''));
      }

      base.parentElement.querySelectorAll('div.entry > .left:not(.structureImageSmall)').forEach((structure: Element) => {
        result.planetScan.structures.push(
          new NameQuantity(
            structure.textContent.split(/x\s+/)[1].trim().replace(/_/g, ' ').toLowerCase(),
            parseInt(structure.textContent.split(/x\s+/)[0].trim())
          )
        );
      });

      // -- calculate native production (no bonuses applied)
      result.planetScan.structures.forEach((structure) => {
        switch (structure.name as Structures) {
          case Structures.OUTPOST: {
            result.planetScan.resources[0].production += 300;
            result.planetScan.resources[1].production += 200;
            result.planetScan.resources[2].production += 100;
            break;
          }
          case Structures.METAL_MINE: {
            result.planetScan.resources[0].production += structure.quantity * 300;
            break;
          }
          case Structures.MINERAL_EXTRACTOR: {
            result.planetScan.resources[1].production += structure.quantity * 200;
            break;
          }
          case Structures.FARM: {
            result.planetScan.resources[2].production += structure.quantity * 300;
            break;
          }
          case Structures.SOLAR_GENERATOR: {
            result.planetScan.resources[3].production += structure.quantity * 100;
            break;
          }

          case Structures.CORE_METAL_MINE: {
            result.planetScan.resources[0].production += structure.quantity * 900;
            break;
          }
          case Structures.CORE_MINERAL_EXTRACTOR: {
            result.planetScan.resources[1].production += structure.quantity * 600;
            break;
          }
          case Structures.HYDROPONICS_LAB: {
            result.planetScan.resources[2].production += structure.quantity * 900;
            break;
          }
          case Structures.SOLAR_ARRAY: {
            result.planetScan.resources[3].production += structure.quantity * 300;
            break;
          }

          case Structures.STRIP_METAL_MINE: {
            result.planetScan.resources[0].production += structure.quantity * 9000;
            break;
          }
          case Structures.STRIP_MINERAL_EXTRACTOR: {
            result.planetScan.resources[1].production += structure.quantity * 6000;
            break;
          }
          case Structures.HYDROPONICS_DOME: {
            result.planetScan.resources[2].production += structure.quantity * 9000;
            break;
          }
          case Structures.SOLAR_STATION: {
            result.planetScan.resources[3].production += structure.quantity * 3000;
            break;
          }
        }
      });
    }

    if (scanType === ScanType.FLEET) {
      // -- TODO: implement this when needed.
    }

    result.planetScan.resources.forEach((resource) => {
      resource.production = Math.ceil((resource.production * resource.abundance) / 100);
    });

    return result;
  }

  cleanAfterExtract(): void {
    // -- Nothing to do
  }
}
