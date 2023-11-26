import {inject, Injectable} from '@angular/core';
import {PlanetScan} from "../../../../shared/model/scans/planet-scan.model";
import {DarkgalaxyApiService} from "../../../darkgalaxy-ui-parser/service/darkgalaxy-api.service";
import {PlanetScanEvent} from "../../../../shared/model/scans/planet-scan-event.model";
import {ScanType} from "../../../../shared/model/scans/scan-type";
import {Resource} from "../../../../shared/model/planets/resource.model";
import {collection, collectionData, doc, Firestore, limit, query, setDoc, updateDoc, where} from "@angular/fire/firestore";
import firebase from "firebase/compat";
import {firstValueFrom, Subscription} from "rxjs";
import {HttpClient} from "@angular/common/http";
import DocumentData = firebase.firestore.DocumentData;

@Injectable({
  providedIn: 'root'
})
export class ScanService {
  private firestore: Firestore = inject(Firestore);
  private dgAPI: DarkgalaxyApiService = inject(DarkgalaxyApiService);
  private httpClient: HttpClient = inject(HttpClient);

  extractScan(): PlanetScanEvent {
    return this.dgAPI.planetScan();
  }

  async scanSystem(): Promise<void> {
    const scans: PlanetScanEvent[] = await this.extractSystemScan();

    scans.forEach((scanEvent: PlanetScanEvent): void => {
      this.updateScan(scanEvent);
    });
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

  private async extractSystemScan(): Promise<PlanetScanEvent[]> {
    let result: PlanetScanEvent[] = [];

    for (let i = 1; i <= 2; i++) {
      await this.delay(1000);
      let source: string = await firstValueFrom(this.httpClient.post('https://andromeda.darkgalaxy.com/planet/1231/production/queue/add/',
        {
          'token': '03AFcWeA5H3UwYEHqdA0CWLKDV01h0T9ywurVmzCXoOdER5X3LOURPrXNCfRNIHInZXH-Sj0Tzz_Sd__4VbUun6C4EKWMJTGi5YPZC08te2zDksM4ocmaTE78bHPalPDL4O-NjSUKnC0apB6jAycqTWKl_Wpkp0r1h85wWUamkKOUhJW0ZRokRnp-_X_G4dBqTBsEqD2kCoSngAFqoqIItX4QfMUaryANs6GiPZ1gLFISZ0ePyji7QZUJNZTJ_dzNKsoMMkAFcujUOv9S-03AFcWeA6k_30qq1WPOeR-LbRXyTOvZEX--E95kq2IE2wQ_OaHJAqbUEZxKdqQtGN3QWxubdmWbPVShEyKYPWVOnZFjDWu82HoXDSmvilcZPFdu4BTg1QWUdju6NCoP4riRkITjdZmM0gQbM42YwcIRdNEj-kWGq3oj_W79zQTdc4ChCmr2jfqmFc-yV93NOunTCdz8NFvlwGifxrapAyva8tFKEcwpNZFSBXyHwS0bUMKEaB_cXiyX9aknat8ky_oxSaR8Nofbn5tMNceE6J2J4DUfeQudxBUoA-Kwng5x6lMdgmVfdY6vIJhVVIIneRLALaMfNMAtO5LkJ1FGU4nxPN6MigzwisGBzamlaD3nxGJYv8GyCYbEVYQoPTKfnzQg0Kf66pUFMe5xTtabkDIqqz8OUtIVPzF9QeLWHls330bhW3cyoGSA5ppH22Qkz3HXUTDOM6f8dOl-Jd6Suc--BjWT4f5HEs2KYNKMg6YQJ0H3gXhDfVn6Xq9hHmYfqldZYmoKbdDmED4jD9AWHe_3J1UAB8AvOk3i48f-lrlR74TNI8EkjzS9qwV_8EUNQpQEc7LSLymu-SHp61piBQmXev3nPnIF4xApQ',
          'submit': 'Add+to+Queue',
          'action': 'queueAdd',
          'unitMap.109': '',
          'unitMap.110': '',
          'unitMap.111': '10',
          'unitMap.115': '',
          'unitMap.117': '',
          'unitMap.118': ''

        },
        {responseType: 'text'})
      );

      let dom: Document = new DOMParser().parseFromString(source, 'text/html');

      console.log(dom.querySelector('.metal.data').textContent.trim());
    }

    return result;
  }

  private delay = async (ms: number): Promise<unknown> => new Promise(res => setTimeout(res, ms));
}
