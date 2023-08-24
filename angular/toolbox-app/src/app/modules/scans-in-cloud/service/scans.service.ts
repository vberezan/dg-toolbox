import {inject, Injectable} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {PlanetScan} from "../model/planet-scan.model";
import {DarkgalaxyApiService} from "../../darkgalaxy-ui-parser/service/darkgalaxy-api.service";
import {PlanetScanEvent} from "../model/planet-scan-event.model";
import {ScanType} from "../model/scan-type";
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
      .where('_location', '==', scanEvent.planetScan.location)
      .limit(1)
    ).get().subscribe((items) => {
      let dbScan: PlanetScan = items.docChanges().map(entry => {
        return entry.doc.data() as PlanetScan;
      })[0];

      console.log(dbScan.ground);
      console.log(dbScan.workers);
      console.log(dbScan.resources);


      if (scanEvent.type == ScanType.FLEET) {
        dbScan.fleet = scanEvent.planetScan.fleet;
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
      }

      if (scanEvent.type == ScanType.RESOURCE || scanEvent.type == ScanType.SURFACE) {
        dbScan.orbit = scanEvent.planetScan.orbit;
        dbScan.ground = scanEvent.planetScan.ground;
      }

      this.firestore.collection('scans')
        .doc(items.docs[0].id)
        .set(JSON.parse(JSON.stringify(scanEvent.planetScan))).then(() => {
        console.log("Planet Scan [" + scanEvent.type + "] updated to FireStore: [" + JSON.stringify(scanEvent.planetScan) + "]");
      })
    });
  }

  constructor() {

    // this.firestore.firestore.collection('scans').get().then((snapshot) => {
    //   snapshot.forEach((data) => {
    //     console.log(data.get('_resources'));
    //   })
    // });
    //
    // let fs: PlanetScan = new PlanetScan();
    // fs.ground = 10;
    // fs.orbit = 11;
    // fs.soldiers = 22;
    // fs.workers.maximumNumber = 1;
    // fs.workers.currentNumber = 2;
    // fs.workers.available = 3;
    //
    // let r: Resource = new Resource();
    // r.name = 'metal';
    // r.production = 111;
    // r.stored = 222;
    // r.abundance = 33;
    // fs.resources.push(r);
    //
    // fs.buildings.push(new NameQuantity('metal-mine', 22));
    // fs.buildings.push(new NameQuantity('mineral-mine', 33));
    //
    // fs.fleet.push(new NameQuantity(Ships.FIGHTER, 33));
    // fs.fleet.push(new NameQuantity('bombers', 33));


    // this.firestore.firestore.collection('scans').add(JSON.parse(JSON.stringify(fs))).then(() => {
    //   console.log("SENT!");
    // })
  }
}
