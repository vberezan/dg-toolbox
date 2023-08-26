import {inject, Injectable} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {PlanetScan} from "../../../model/shared-scans/shared-scans-planet-scan.model";
import {DarkgalaxyApiService} from "../../darkgalaxy-ui-parser/service/darkgalaxy-api.service";
import {PlanetScanEvent} from "../../../model/shared-scans/shared-scans-planet-scan-event.model";
import {ScanType} from "../../../model/scan-type";
import {Resource} from "../../../model/resource.model";

@Injectable({
  providedIn: 'root'
})
export class ScansService {
  private firestore: AngularFirestore = inject(AngularFirestore);
  private dgAPI: DarkgalaxyApiService = inject(DarkgalaxyApiService);

  extractScan(): PlanetScanEvent {
    return this.dgAPI.planetScan();
  }

  updateScan(scanEvent: PlanetScanEvent): void {
    this.firestore.collection<PlanetScan>('scans', ref => ref
      .where('location', '==', scanEvent.planetScan.location)
      .limit(1)
    ).get().subscribe((items) => {
      let dbScan: PlanetScan =
        Object.assign(new PlanetScan(), items.docChanges().map(entry => {
          return entry.doc.data();
        })[0]);
      dbScan.location = scanEvent.planetScan.location;
      dbScan.turn = scanEvent.planetScan.turn;

      if (scanEvent.type == ScanType.RESOURCE || scanEvent.type == ScanType.SURFACE) {
        dbScan.orbit = scanEvent.planetScan.orbit;
        dbScan.ground = scanEvent.planetScan.ground;
      }

      if (scanEvent.type == ScanType.RESOURCE) {
        if (dbScan.resources.length > 0) {
          dbScan.resources.forEach((dbResource: Resource, index) => {
            dbResource.abundance = scanEvent.planetScan.resources[index].abundance;
          });
        } else {
          dbScan.resources = scanEvent.planetScan.resources;
        }
      }

      if (scanEvent.type == ScanType.SURFACE) {
        dbScan.resources = scanEvent.planetScan.resources;
        dbScan.workers = scanEvent.planetScan.workers;
        dbScan.soldiers = scanEvent.planetScan.soldiers;
        dbScan.structures = scanEvent.planetScan.structures;


      }

      if (scanEvent.type == ScanType.FLEET) {
        dbScan.fleet = scanEvent.planetScan.fleet;
      }

      if (items.size == 0) {
        this.firestore.collection('scans').add(JSON.parse(JSON.stringify(dbScan)));
      } else {
        this.firestore.collection('scans')
          .doc(items.docs[0].id)
          .set(JSON.parse(JSON.stringify(dbScan)));
      }
    });
  }

  constructor() {
  }
}
