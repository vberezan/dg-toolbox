import { Injectable } from '@angular/core';
import {Fleet} from "../../../../shared/model/fleet/fleet.model";

@Injectable({
  providedIn: 'root'
})
export class FleetScoreService {

  applyFleetScore(fleets: Fleet[]): void {
    fleets.forEach((fleet: Fleet): void => {
      document.querySelector('.dgt-fleet[dgt-fleet-id="' + fleet.id + '"] .dgt-fleet-score-value').innerHTML = fleet.score.toString();
    });
  }
}
