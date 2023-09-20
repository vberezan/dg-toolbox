import {inject, Injectable} from '@angular/core';
import {PlanetScan} from "../../../../model/scans/shared-scans-planet-scan.model";
import {DarkgalaxyApiService} from "../../../darkgalaxy-ui-parser/service/darkgalaxy-api.service";
import {PlanetScanEvent} from "../../../../model/scans/shared-scans-planet-scan-event.model";
import {ScanType} from "../../../../model/scan-type";
import {Resource} from "../../../../model/resource.model";
import {addDoc, collection, collectionData, doc, Firestore, limit, query, updateDoc, where} from "@angular/fire/firestore";
import firebase from "firebase/compat";
import DocumentData = firebase.firestore.DocumentData;

@Injectable({
  providedIn: 'root'
})
export class ScanService {
  private firestore: Firestore = inject(Firestore);
  private dgAPI: DarkgalaxyApiService = inject(DarkgalaxyApiService);

  constructor() {
  }

  extractScan(): PlanetScanEvent {
    return this.dgAPI.planetScan();
  }

  updateScan(scanEvent: PlanetScanEvent): void {
    let scansRef = collection(this.firestore, 'scans');

    collectionData(
      query(scansRef,
        where('location', '==', scanEvent.planetScan.location),
        limit(1)
      ), {idField: 'id'}
    ).subscribe((items: DocumentData[]) => {
      let dbScan: PlanetScan = Object.assign(new PlanetScan(), items[0]);

      dbScan.location = scanEvent.planetScan.location;
      dbScan.turn = scanEvent.planetScan.turn;
      dbScan.owner = scanEvent.planetScan.owner;

      if (scanEvent.type == ScanType.RESOURCE || scanEvent.type == ScanType.SURFACE) {
        dbScan.orbit = scanEvent.planetScan.orbit;
        dbScan.ground = scanEvent.planetScan.ground;
      }

      if (scanEvent.type == ScanType.RESOURCE) {
        if (dbScan.resources.length > 0) {
          dbScan.resources.forEach((dbResource: Resource, index) => {
            dbResource.abundance = scanEvent.planetScan.resources[index].abundance;
            dbResource.name = scanEvent.planetScan.resources[index].name;
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
        dbScan.fleets = scanEvent.planetScan.fleets;
      }

      if (items.length == 0) {
        addDoc(scansRef, JSON.parse(JSON.stringify(dbScan)))
          .catch((error): void => {
              console.log(error);
            }
          );
      } else {
        updateDoc(doc(scansRef, dbScan.id), JSON.parse(JSON.stringify(dbScan))).catch((error) => {
          console.log(error);
        });
      }
    });
  }
}
