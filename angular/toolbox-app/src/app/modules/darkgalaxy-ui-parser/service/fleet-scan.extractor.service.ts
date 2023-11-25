import { Injectable } from '@angular/core';
import {DataExtractor} from "./data-extractor";
import {Fleet} from "../../../shared/model/fleet/fleet.model";
import {NameQuantity} from "../../../shared/model/name-quantity.model";
import {ShipType} from "../../../shared/model/fleet/ship-type";

@Injectable({
  providedIn: 'platform'
})
export class FleetScanExtractorService implements DataExtractor {

  extract(): Fleet[] {
    let result: Fleet[] = [];

    console.log(document.querySelector('#planet-scan-additional'));

    if (document.querySelector('#planet-scan-additional')) {

      const fleets: NodeListOf<Element> = document.querySelectorAll('#planet-scan-additional > div.left');

      fleets.forEach((fl: Element): void => {
        let fleet: Fleet = new Fleet();

        console.log(fl);

        fleet.mine = fl.querySelector('span.friendly') ? true : false;
        fleet.allied = fl.querySelector('span.allied') ? true : false;
        fleet.hostile = fl.querySelector('span.hostile') ? true : false;

        fleet.owner = fl.querySelector('.playerName').textContent.toLowerCase().trim();
        fleet.alliance = fl.querySelector('.allianceName').textContent.toLowerCase().trim().replace(/\[/g, '').replace(/]/g, '');
        fleet.eta =  parseInt(fl.querySelector('.ofHidden:first-child > .right').textContent.trim().match(/\d+/)[0]);

        let fleetShips: NodeListOf<Element> = fl.querySelectorAll('table tr');
        fleetShips.forEach((fs: Element): void => {
          let ship: string = fs.querySelector('td:first-child').textContent.trim().toLowerCase();
          let amount: number = parseInt(fs.querySelector('td:last-child').textContent.trim().match(/\d+/)[0]);

          if (ship in ShipType) {
            fleet.ships.push(new NameQuantity(ship, amount));
          }
        });

        console.log(fleet);

        if (fleet.ships.length > 0) {
          result.push(fleet);
        }
      });
    }


    console.log(result);

    return result;
  }

  cleanAfterExtract(): void {
  }
}
