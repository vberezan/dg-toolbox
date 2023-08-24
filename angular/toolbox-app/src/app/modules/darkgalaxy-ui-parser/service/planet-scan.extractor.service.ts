import {inject, Injectable} from '@angular/core';
import {DOCUMENT} from "@angular/common";
import {DataExtractor} from "./data-extractor";
import {PlanetScan} from "../../scans-in-cloud/model/planet-scan.model";
import {ScanType} from "../../scans-in-cloud/model/scan-type";
import {Resource} from "../../../model/resource.model";
import {PlanetScanEvent} from "../../scans-in-cloud/model/planet-scan-event.model";

@Injectable({
  providedIn: 'root'
})
export class PlanetScanExtractorService implements DataExtractor {
  private document: any = inject(DOCUMENT);

  constructor() {
  }

  extract(): PlanetScanEvent {
    // -- no scan
    if (document.querySelectorAll('#contentBox #planetHeader').length <= 1) {
      return null;
    }

    let planetScan: PlanetScan = new PlanetScan();
    let base: Element = document.querySelectorAll('#contentBox #planetHeader')[1];
    let scanType: ScanType;

    switch (base.querySelectorAll('.planetHeadSection .resource > span').length) {
      case 5: {
        scanType = ScanType.SURFACE;
        break;
      }
      case 3: {
        scanType = ScanType.RESOURCE;
        break;
      }
      case 0: {
        scanType = ScanType.FLEET;
        break;
      }
      default: scanType = ScanType.UNKNOWN;
    }

    let result = new PlanetScanEvent(planetScan, scanType);


    if (scanType === ScanType.RESOURCE || scanType === ScanType.SURFACE) {
      result.planetScan.orbit = parseInt(base.querySelectorAll('.planetHeadSection .resource > span')[0].textContent);
      result.planetScan.ground = parseInt(base.querySelectorAll('.planetHeadSection .resource > span')[1].textContent);
      result.planetScan.location = base.querySelectorAll('.planetHeadSection .coords')[0].textContent.replace(/\s+/,'');

    }

    if (scanType === ScanType.RESOURCE) {
      base.querySelectorAll('.planetHeadSection .resourceRow:nth-child(2) > .data:not(:first-child)').forEach((abundance: Element) => {
        let resource: Resource = new Resource();
        resource.abundance = parseInt(abundance.textContent);

        result.planetScan.resources.push(resource);
      });
    }

    if (scanType === ScanType.SURFACE) {
      base.querySelectorAll('.planetHeadSection .resourceRow:nth-child(2) > .data:not(:first-child)').forEach((production: Element) => {
        let resource: Resource = new Resource();
        resource.stored = parseInt(production.textContent.replace(/,/g, ''));

        result.planetScan.resources.push(resource);
      });

      base.querySelectorAll('.planetHeadSection .resourceRow:nth-child(3) > .data:not(:first-child)').forEach((abundance: Element, index: number) => {
        result.planetScan.resources[index].abundance = parseInt(abundance.textContent);
      });

      result.planetScan.workers.currentNumber = parseInt(base.querySelectorAll('.planetHeadSection .resource > span')[3].textContent.split(/\//g)[0].replace(/,/g, ''));
      result.planetScan.workers.maximumNumber = parseInt(base.querySelectorAll('.planetHeadSection .resource > span')[3].textContent.split(/\//g)[1].replace(/,/g, ''));
      result.planetScan.workers.available = parseInt(base.querySelectorAll('.planetHeadSection .resource > span')[4].textContent.split(/\s+/)[0].replace(/[(,]/g, ''));

      result.planetScan.soldiers = parseInt(base.querySelectorAll('.planetHeadSection .resource > span')[2].textContent.replace(/,/g, ''));
    }

    return result;
  }
}
