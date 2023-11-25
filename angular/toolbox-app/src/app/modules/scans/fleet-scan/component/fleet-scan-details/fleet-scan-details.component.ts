import {Component, inject} from '@angular/core';
import {FightSimulatorService} from "../../service/fight-simulator.service";
import {Fleet} from "../../../../../shared/model/fleet/fleet.model";
import {ShipType} from "../../../../../shared/model/fleet/ship-type";
import {NameQuantity} from "../../../../../shared/model/name-quantity.model";
import {DarkgalaxyApiService} from "../../../../darkgalaxy-ui-parser/service/darkgalaxy-api.service";

@Component({
  selector: 'dgt-fleet-scan-details',
  templateUrl: './fleet-scan-details.component.html',
  styleUrls: ['./fleet-scan-details.component.css']
})
export class FleetScanDetailsComponent {
  private fightSimulatorService: FightSimulatorService = inject(FightSimulatorService);
  private dgAPI: DarkgalaxyApiService = inject(DarkgalaxyApiService);

  url: string = "https://helloweenpt.com/darkgalaxy/combat-simulator";

  constructor() {
    // this.dgAPI.fleetScan();

    let fleet1: Fleet = new Fleet();
    let fleet2: Fleet = new Fleet();

    fleet1.ships.push(new NameQuantity(ShipType.FIGHTER, 16567));
    fleet1.ships.push(new NameQuantity(ShipType.BOMBER, 1564));
    fleet1.ships.push(new NameQuantity(ShipType.FRIGATE, 3103));
    fleet1.ships.push(new NameQuantity(ShipType.DESTROYER, 978));
    fleet1.ships.push(new NameQuantity(ShipType.CRUISER, 240));
    fleet1.ships.push(new NameQuantity(ShipType.BATTLESHIP, 120));

    fleet2.ships.push(new NameQuantity(ShipType.FIGHTER, 13455));
    fleet2.ships.push(new NameQuantity(ShipType.BOMBER, 2354));
    fleet2.ships.push(new NameQuantity(ShipType.FRIGATE, 2320));
    fleet2.ships.push(new NameQuantity(ShipType.DESTROYER, 888));
    fleet2.ships.push(new NameQuantity(ShipType.CRUISER, 255));
    fleet2.ships.push(new NameQuantity(ShipType.BATTLESHIP, 75));

    // this.fightSimulatorService.simulateFight(fleet1, fleet2);
  }

}
