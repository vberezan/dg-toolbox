import {inject, Injectable} from '@angular/core';
import {DarkgalaxyApiService} from "../../darkgalaxy-ui-parser/service/darkgalaxy-api.service";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {PlanetSummary} from "../../../model/planet-list/planet-summary.planet-list-model";
import {PlanetScan} from "../../../model/shared-scans/shared-scans-planet-scan.model";
import {DecimalPipe, DOCUMENT} from "@angular/common";
import {Resource} from "../../../model/resource.model";
import {ResourceProductionFormatterPipe} from "../../planet-list-stats/pipe/resource-production-formatter.pipe";
import {Structures} from "../../../model/structures";

@Injectable({
  providedIn: 'root'
})
export class ScansService {
  private document: any = inject(DOCUMENT);
  private resourceProductionFormatterPipe: ResourceProductionFormatterPipe = inject(ResourceProductionFormatterPipe);
  private decimalPipe: DecimalPipe = inject(DecimalPipe);
  private dgAPI: DarkgalaxyApiService = inject(DarkgalaxyApiService);
  private firestore: AngularFirestore = inject(AngularFirestore);

  constructor() {
  }

  extractSummaries(): PlanetSummary[] {
    return this.dgAPI.navigationSystemPlanets();
  }

  fillScans(summaries: PlanetSummary[]) {
    let locations = summaries.map(summary => summary.location.join('.'))
    this.firestore.collection<PlanetScan>('scans', ref => ref.where('location', 'in', locations)
    ).get().subscribe((items) => {
      let dbScans: PlanetScan[] =
        Object.assign([], items.docChanges().map(entry => {
          return entry.doc.data();
        }));

      let byLocation: Map<String, PlanetScan> = dbScans.reduce(
        (entryMap, e) => entryMap.set(e.location, e),
        new Map()
      );

      this.document.querySelectorAll('div.navigation div.planets').forEach((planet: Element) => {
        let planetLocation: string = planet.querySelector('div.coords > span').textContent.trim();

        if (byLocation.get(planetLocation)) {
          planet.querySelector('.dgt-navigation-scan-turn .dgt-navigation-scan-turn-value').textContent =
            this.decimalPipe.transform(byLocation.get(planetLocation).turn, '1.0', 'en_US');

          byLocation.get(planetLocation).resources.forEach((resource: Resource) => {
            planet.querySelector('.dgt-navigation-scan .dgt-navigation-scan-resource.' + resource.name + ' .abundance')
              .textContent = resource.abundance.toString() + '%';

            planet.querySelector('.dgt-navigation-scan .dgt-navigation-scan-resource.' + resource.name + ' .production')
              .textContent = this.resourceProductionFormatterPipe.transform(resource.production).trim();
          });

          let structureNames = byLocation.get(planetLocation).structures.map(structure => structure.name);
          if (structureNames.includes(Structures.JUMP_GATE)) {
            let jgSpan = document.createElement('span');
            jgSpan.classList.add('dgt-navigation-scan-jg');
            jgSpan.textContent = 'JG';
            planet.querySelector('.coords').append(jgSpan);
          }

          if (structureNames.includes(Structures.HYPERSPACE_BEACON)) {
            let hnSpan = document.createElement('span');
            hnSpan.classList.add('dgt-navigation-scan-hb');
            hnSpan.textContent = 'HB';
            planet.querySelector('.coords').append(hnSpan);
          }

          if (structureNames.includes(Structures.SPACE_TETHER)) {
            let stSpan = document.createElement('span');
            stSpan.classList.add('dgt-navigation-scan-st');
            stSpan.textContent = 'ST';
            planet.querySelector('.coords').append(stSpan);
          }
        } else {
          planet.querySelector('.dgt-navigation-scan-turn .dgt-navigation-scan-turn-value').textContent = 'N/A';
          planet.querySelector('.dgt-navigation-scan .dgt-navigation-scan-resource.metal .abundance').textContent = '-';
          planet.querySelector('.dgt-navigation-scan .dgt-navigation-scan-resource.mineral .abundance').textContent = '-';
          planet.querySelector('.dgt-navigation-scan .dgt-navigation-scan-resource.food .abundance').textContent = '-';
          planet.querySelector('.dgt-navigation-scan .dgt-navigation-scan-resource.energy .abundance').textContent = '-';
        }

      });

      // dbScans.forEach((dbScan: PlanetScan) => {
      //   console.log(dbScan.location);
      // });
    });
  }
}
