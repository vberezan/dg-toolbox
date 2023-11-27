import {Injectable} from '@angular/core';
import {Fleet} from "../../../../shared/model/fleet/fleet.model";

@Injectable({
  providedIn: 'root'
})
export class FleetScoreService {

  applyFleetScore(fleets: Fleet[]): void {
    const groupedFleets: Map<string, Fleet[]> = new Map<string, Fleet[]>();

    fleets.forEach((fleet: Fleet): void => {

      const fleetDom: Element = document.querySelector('.dgt-fleet[dgt-fleet-id="' + fleet.id + '"]');

      if (fleetDom != null) {
        fleetDom.querySelector('.dgt-fleet-score-value').innerHTML =
          Math.ceil(fleet.score).toLocaleString('en-US', {maximumFractionDigits: 0, minimumFractionDigits: 0});
      }
    });

    document.querySelectorAll('.dgt-eta-score').forEach((etaScore: Element): void => {
      const eta: number = parseInt(etaScore.attributes.getNamedItem('eta').value);
      const fleetsByEta: Fleet[] = fleets.filter((fleet: Fleet): boolean => fleet.eta === eta);
      let totalHostile: number = 0;
      let totalAllied: number = 0;

      if (fleetsByEta.length > 0) {
        fleetsByEta.forEach((fleet: Fleet): void => {
          if (fleet.hostile) {
            totalHostile += Math.ceil(fleet.score);
          } else {
            totalAllied += Math.ceil(fleet.score);
          }
        });
      }

      etaScore.querySelector('.hostile.dgt-eta-score-value').innerHTML =
        Math.ceil(totalHostile).toLocaleString('en-US', {maximumFractionDigits: 0, minimumFractionDigits: 0});
      etaScore.querySelector('.allied.dgt-eta-score-value').innerHTML =
        Math.ceil(totalAllied).toLocaleString('en-US', {maximumFractionDigits: 0, minimumFractionDigits: 0});
    });
  }
}
