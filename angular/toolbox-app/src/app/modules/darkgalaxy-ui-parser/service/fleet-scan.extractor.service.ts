import {Injectable} from '@angular/core';
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

    if (document.querySelector('#planet-scan-additional')) {

      const fleets: NodeListOf<Element> = document.querySelectorAll('#planet-scan-additional .dgt-fleet');

      fleets.forEach((fl: Element): void => {
        let fleet: Fleet = new Fleet();

        fleet.friendly = fl.querySelector('span.friendly') ? true : false;
        fleet.allied = fl.querySelector('span.allied') ? true : false;
        fleet.hostile = fl.querySelector('span.hostile') ? true : false;

        fleet.owner = fl.querySelector('.playerName').textContent.toLowerCase().trim();

        if (fl.querySelector('.allianceName')) {
          fleet.alliance = fl.querySelector('.allianceName').textContent.toLowerCase().trim().replace(/\[/g, '').replace(/]/g, '');
        }

        if (fl.querySelector('.ofHidden:first-child > .right')) {
          fleet.eta = parseInt(fl.querySelector('.ofHidden:first-child > .right').textContent.trim().match(/\d+/)[0]);
        } else {
          fleet.eta = 0;
        }

        let fleetShips: NodeListOf<Element> = fl.querySelectorAll('table tr:not(.dgt-empty-fleet-row)');

        if (fleetShips.length > 0) {
          fleetShips.forEach((fs: Element): void => {
            let ship: string = fs.querySelector('td:first-child').textContent.trim().toLowerCase();
            let amount: number = parseInt(fs.querySelector('td:last-child').textContent.trim().match(/\d+/)[0]);

            if (Object.values(ShipType).includes(ship as ShipType)) {
              fleet.ships.push(new NameQuantity(ship, amount));
            }
          });

          if (fleet.ships.length > 0) {
            result.push(fleet);
          }
        }
      });
    }

    return result;
  }

  cleanAfterExtract(): void {
  }
}
