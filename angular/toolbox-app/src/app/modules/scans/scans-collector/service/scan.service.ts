import {inject, Injectable} from '@angular/core';
import {PlanetScan} from "../../../../shared/model/scans/planet-scan.model";
import {DarkgalaxyApiService} from "../../../darkgalaxy-ui-parser/service/darkgalaxy-api.service";
import {PlanetScanEvent} from "../../../../shared/model/scans/planet-scan-event.model";
import {ScanType} from "../../../../shared/model/scans/scan-type";
import {Resource} from "../../../../shared/model/planets/resource.model";
import {collection, collectionData, doc, Firestore, limit, query, setDoc, updateDoc, where} from "@angular/fire/firestore";
import firebase from "firebase/compat";
import {Subscription} from "rxjs";
import DocumentData = firebase.firestore.DocumentData;

@Injectable({
  providedIn: 'root'
})
export class ScanService {
  private firestore: Firestore = inject(Firestore);
  private dgAPI: DarkgalaxyApiService = inject(DarkgalaxyApiService);

  extractScan(): PlanetScanEvent {
    return this.dgAPI.planetScan();
  }

  updateScan(scanEvent: PlanetScanEvent): void {
    if (scanEvent.type != ScanType.SURFACE && scanEvent.type != ScanType.RESOURCE) {
      return;
    }

    const scansRef: any = collection(this.firestore, 'scans-g' + scanEvent.planetScan.location.split(/\./)[0]);

    let subscription: Subscription = collectionData<DocumentData, string>(
      query(scansRef,
        where('location', '==', scanEvent.planetScan.location),
        limit(1)
      )
      // , {idField: 'id'} -- how to add id to the response
    ).subscribe((items: DocumentData[]): void => {
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

      if (items.length == 0) {
        setDoc(doc(scansRef, dbScan.location), JSON.parse(JSON.stringify(dbScan)))
          .catch((error): void => {
              console.log(error);
            }
          );
      } else {
        updateDoc(doc(scansRef, dbScan.location), JSON.parse(JSON.stringify(dbScan)))
          .catch((error): void => {
            console.log(error);
          });
      }

      subscription.unsubscribe();
    });
  }
}
