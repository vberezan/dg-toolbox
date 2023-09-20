import {inject, Injectable} from '@angular/core';
import {DarkgalaxyApiService} from "../../../darkgalaxy-ui-parser/service/darkgalaxy-api.service";
import {PlanetSummary} from "../../../../model/planets/planet-summary.planet-list-model";
import {PlanetScan} from "../../../../model/scans/shared-scans-planet-scan.model";
import {DecimalPipe} from "@angular/common";
import {Resource} from "../../../../model/resource.model";
import {ResourceProductionFormatterPipe} from "../../../planets/planet-list-stats/pipe/resource-production-formatter.pipe";
import {Structures} from "../../../../model/structures";
import {collection, collectionData, Firestore, limit, query, where} from "@angular/fire/firestore";
import firebase from "firebase/compat";
import DocumentData = firebase.firestore.DocumentData;
import {NameQuantity} from "../../../../model/name-quantity.model";

@Injectable({
  providedIn: 'root'
})
export class ScanService {
  private firestore: Firestore = inject(Firestore);
  private dgAPI: DarkgalaxyApiService = inject(DarkgalaxyApiService);
  private resourceProductionFormatterPipe: ResourceProductionFormatterPipe = inject(ResourceProductionFormatterPipe);
  private decimalPipe: DecimalPipe = inject(DecimalPipe);

  extractSummaries(): PlanetSummary[] {
    return this.dgAPI.navigationSystemPlanets();
  }

  fillScans(summaries: PlanetSummary[]) {
    let locations: string[] = summaries.map((summary: PlanetSummary) => summary.location.join('.'));

    collectionData(
      query(collection(this.firestore, 'scans'),
        where('location', 'in', locations)
      )
    ).forEach((items: DocumentData[]): void => {
      let dbScans: PlanetScan[] = Object.assign([], items);

      let byLocation: Map<String, PlanetScan> = dbScans.reduce((entryMap: Map<any, any>, e: PlanetScan) =>
        entryMap.set(e.location, e), new Map()
      );

      document.querySelectorAll('div.navigation div.planets').forEach((planet: any): void=> {
        let planetLocation: string = planet.querySelector('div.coords > span').textContent.trim();
        let pl: PlanetScan = byLocation.get(planetLocation);

        planet.querySelector('.dgt-navigation-scan-turn').style.display = 'contents';
        planet.querySelector('img:first-child').style.filter = 'grayscale(100%)';

        if (pl) {
          planet.querySelector('.dgt-navigation-scan-turn-value').textContent =
            this.decimalPipe.transform(pl.turn, '1.0', 'en_US');

          pl.resources.forEach((resource: Resource): void => {
            planet.querySelector('.dgt-navigation-scan .dgt-navigation-scan-resource.' + resource.name + ' .abundance')
              .textContent = resource.abundance.toString() + '%';

            planet.querySelector('.dgt-navigation-scan .dgt-navigation-scan-resource.' + resource.name + ' .production')
              .textContent = this.resourceProductionFormatterPipe.transform(resource.production).trim();
          });

          let structureNames: string[] = pl.structures.map((structure: NameQuantity) => structure.name);
          if (structureNames.includes(Structures.JUMP_GATE)) {
            let jg: Element = planet.querySelector('.dgt-navigation-scan-structures-data .jg');
            jg.textContent = 'JG';
          }
          if (structureNames.includes(Structures.HYPERSPACE_BEACON)) {
            let hb: Element = planet.querySelector('.dgt-navigation-scan-structures-data .hb');
            hb.textContent = 'HB';
          }
          if (structureNames.includes(Structures.LIGHT_WEAPONS_FACTORY)) {
            let lw: Element = planet.querySelector('.dgt-navigation-scan-structures-data .lw');
            lw.textContent = 'LW';
          }
          if (structureNames.includes(Structures.HEAVY_WEAPONS_FACTORY)) {
            let hw: Element = planet.querySelector('.dgt-navigation-scan-structures-data .hw');
            hw.textContent = 'HW';
          }
          if (structureNames.includes(Structures.SHIP_YARD)) {
            let sy: Element = planet.querySelector('.dgt-navigation-scan-structures-data .sy');
            sy.textContent = 'SY';
          }
          if (structureNames.includes(Structures.SPACE_DOCK)) {
            let sd: Element = planet.querySelector('.dgt-navigation-scan-structures-data .sd');
            sd.textContent = 'SD';
          }
          if (structureNames.includes(Structures.HOLO_GENERATOR)) {
            let hg: Element = planet.querySelector('.dgt-navigation-scan-structures-data .hg');
            hg.textContent = 'HG';
          }
          if (structureNames.includes(Structures.ARMY_BARRACKS)) {
            planet.querySelector('.dgt-navigation-scan-soldiers-ab').textContent = 'AB';
          }
          if (structureNames.includes(Structures.COMMS_SATELLITE)) {
            let cs: Element = planet.querySelector('.dgt-navigation-scan-structures-data .cs');
            cs.textContent = 'CS';
          }

          let popGrowth: number= 1;
          if (structureNames.includes(Structures.MEDICAL_CENTRE)) {
            popGrowth += 0.3;
          }
          if (structureNames.includes(Structures.LEISURE_CENTRE)) {
            popGrowth += 0.4;
          }
          if (structureNames.includes(Structures.HOSPITAL)) {
            popGrowth += 0.3;
          }

          if (pl.workers.currentNumber > 0 || pl.soldiers > 0) {
            planet.querySelector('.dgt-navigation-scan-workers-value').textContent =
              this.decimalPipe.transform(pl.workers.currentNumber, '1.0', 'en_US');
            planet.querySelector('.dgt-navigation-scan-workers-gr').textContent =
              this.decimalPipe.transform(popGrowth, '1.0', 'en_US');

            planet.querySelector('.dgt-navigation-scan-soldiers-value').textContent =
              this.decimalPipe.transform(pl.soldiers, '1.0', 'en_US');

            let requiredForInvasion: number = ((pl.workers.currentNumber / 15) + (pl.soldiers / 2) * 3) + 1;
            planet.querySelector('.dgt-navigation-scan-structures-data .invasion-value').textContent =
              this.decimalPipe.transform(Math.ceil(requiredForInvasion), '1.0', 'en_US');

            planet.querySelector('.dgt-navigation-scan-population').style.display = '';
            planet.querySelector('.dgt-navigation-scan-structures').style.display = '';
          }
        } else {
          planet.querySelector('.dgt-navigation-scan-turn-value').textContent = 'N/A';
          planet.querySelector('.dgt-navigation-scan-resource.metal .abundance').textContent = '-';
          planet.querySelector('.dgt-navigation-scan-resource.mineral .abundance').textContent = '-';
          planet.querySelector('.dgt-navigation-scan-resource.food .abundance').textContent = '-';
          planet.querySelector('.dgt-navigation-scan-resource.energy .abundance').textContent = '-';
        }
      });

    }).catch((error): void => {
      console.log(error)
    });
  }
}
