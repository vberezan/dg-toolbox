import {Injectable} from '@angular/core';
import {Fleet} from "../../../../shared/model/fleet/fleet.model";

@Injectable({
  providedIn: 'root'
})
export class FleetScoreService {

  applyFleetScore(fleets: Fleet[]): void {
    const groupedFleets: Map<string, Fleet[]> = new Map<string, Fleet[]>();

    fleets.forEach((fleet: Fleet): void => {
      document.querySelector('.dgt-fleet[dgt-fleet-id="' + fleet.id + '"] .dgt-fleet-score-value').innerHTML =
        Math.ceil(fleet.score).toLocaleString('en-US', {maximumFractionDigits: 0, minimumFractionDigits: 0});
    });

    document.querySelectorAll('.dgt-eta-score').forEach((etaScore: Element): void => {
      const eta: number = parseInt(etaScore.attributes.getNamedItem('eta').value);
      const fleetsByEta: Fleet[] = fleets.filter((fleet: Fleet): boolean => fleet.eta === eta);

      if (fleetsByEta.length > 0) {
        const totalScore: number = fleetsByEta.reduce((accumulator: number, fleet: Fleet): number => {
          return accumulator + fleet.score;
        }, 0);

        etaScore.innerHTML = Math.ceil(totalScore).toLocaleString('en-US', {maximumFractionDigits: 0, minimumFractionDigits: 0});
      }
    });
  }
}
