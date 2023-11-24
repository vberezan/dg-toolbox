import {Component, inject} from '@angular/core';
import {FightSimulatorService} from "../../service/fight-simulator.service";
import {Fleet} from "../../../../../shared/model/fleet/fleet.model";
import {ShipType} from "../../../../../shared/model/fleet/ship-type";
import {NameQuantity} from "../../../../../shared/model/name-quantity.model";

@Component({
  selector: 'dgt-fleet-scan-details',
  templateUrl: './fleet-scan-details.component.html',
  styleUrls: ['./fleet-scan-details.component.css']
})
export class FleetScanDetailsComponent {
  private fightSimulatorService: FightSimulatorService = inject(FightSimulatorService);

  url: string = "https://helloweenpt.com/darkgalaxy/combat-simulator";

  constructor() {
    let fleet1: Fleet = new Fleet();
    let fleet2: Fleet = new Fleet();

    fleet1.ships.push(new NameQuantity(ShipType.FIGHTER, 1000));
    fleet1.ships.push(new NameQuantity(ShipType.BOMBER, 1000));
    fleet1.ships.push(new NameQuantity(ShipType.FRIGATE, 1000));
    fleet1.ships.push(new NameQuantity(ShipType.DESTROYER, 1000));
    fleet1.ships.push(new NameQuantity(ShipType.CRUISER, 1000));
    fleet1.ships.push(new NameQuantity(ShipType.FIGHTER, 1000));

    fleet1.ships.push(new NameQuantity(ShipType.FIGHTER, 0));
    fleet1.ships.push(new NameQuantity(ShipType.BOMBER, 0));
    fleet1.ships.push(new NameQuantity(ShipType.FRIGATE, 1000000));
    fleet1.ships.push(new NameQuantity(ShipType.DESTROYER, 0));
    fleet1.ships.push(new NameQuantity(ShipType.CRUISER, 0));
    fleet1.ships.push(new NameQuantity(ShipType.FIGHTER, 0));

    this.fightSimulatorService.simulateFight(fleet1, fleet2);
  }

}
