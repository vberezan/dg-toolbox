import {Injectable} from '@angular/core';
import {Fleet} from "../../../../shared/model/fleet/fleet.model";
import {ShipType} from "../../../../shared/model/fleet/ship-type";
import {NameQuantity} from "../../../../shared/model/name-quantity.model";

@Injectable({
  providedIn: 'root'
})
export class FightSimulatorService {

  simulateFight(fleet1: Fleet, fleet2: Fleet): number {
    let requiredTurns: number = 0;

    console.log('Starting the battle');

    while (!this.isFleetDestroyed(fleet1) && !this.isFleetDestroyed(fleet2)) {
      console.log("Fighters battle: ");
      let remainingFightersFleet1: number = this.fightersAttack(this.getShips(fleet1, ShipType.FIGHTER).quantity, fleet2);
      let remainingFightersFleet2: number = this.fightersAttack(this.getShips(fleet2, ShipType.FIGHTER).quantity, fleet1);
      this.getShips(fleet1, ShipType.FIGHTER).quantity = remainingFightersFleet1;
      this.getShips(fleet2, ShipType.FIGHTER).quantity = remainingFightersFleet2;
      console.log("Fleet 1: " + fleet1.ships.map((nameQuantity: NameQuantity): string => nameQuantity.name + ": " + nameQuantity.quantity).join(", "));
      console.log("Fleet 2: " + fleet2.ships.map((nameQuantity: NameQuantity): string => nameQuantity.name + ": " + nameQuantity.quantity).join(", "));

      console.log("Bombers battle: ");
      let remainingBombersFleet1: number = this.bombersAttack(this.getShips(fleet1, ShipType.BOMBER).quantity, fleet2);
      let remainingBombersFleet2: number = this.bombersAttack(this.getShips(fleet2, ShipType.BOMBER).quantity, fleet1);
      this.getShips(fleet1, ShipType.BOMBER).quantity = remainingBombersFleet1;
      this.getShips(fleet2, ShipType.BOMBER).quantity = remainingBombersFleet2;
      console.log("Fleet 1: " + fleet1.ships.map((nameQuantity: NameQuantity): string => nameQuantity.name + ": " + nameQuantity.quantity).join(", "));
      console.log("Fleet 2: " + fleet2.ships.map((nameQuantity: NameQuantity): string => nameQuantity.name + ": " + nameQuantity.quantity).join(", "));

      console.log("Frigates battle: ");
      let remainingFrigatesFleet1: number = this.frigateAttack(this.getShips(fleet1, ShipType.FRIGATE).quantity, fleet2);
      let remainingFrigatesFleet2: number = this.frigateAttack(this.getShips(fleet2, ShipType.FRIGATE).quantity, fleet1);
      this.getShips(fleet1, ShipType.FRIGATE).quantity = remainingFrigatesFleet1;
      this.getShips(fleet2, ShipType.FRIGATE).quantity = remainingFrigatesFleet2;
      console.log("Fleet 1: " + fleet1.ships.map((nameQuantity: NameQuantity): string => nameQuantity.name + ": " + nameQuantity.quantity).join(", "));
      console.log("Fleet 2: " + fleet2.ships.map((nameQuantity: NameQuantity): string => nameQuantity.name + ": " + nameQuantity.quantity).join(", "));

      console.log("Destroyers battle: ");
      let remainingDestroyersFleet1: number = this.destroyerAttack(this.getShips(fleet1, ShipType.DESTROYER).quantity, fleet2);
      let remainingDestroyersFleet2: number = this.destroyerAttack(this.getShips(fleet2, ShipType.DESTROYER).quantity, fleet1);
      this.getShips(fleet1, ShipType.DESTROYER).quantity = remainingDestroyersFleet1;
      this.getShips(fleet2, ShipType.DESTROYER).quantity = remainingDestroyersFleet2;
      console.log("Fleet 1: " + fleet1.ships.map((nameQuantity: NameQuantity): string => nameQuantity.name + ": " + nameQuantity.quantity).join(", "));
      console.log("Fleet 2: " + fleet2.ships.map((nameQuantity: NameQuantity): string => nameQuantity.name + ": " + nameQuantity.quantity).join(", "));

      console.log("Cruisers battle: ");
      let remainingCruisersFleet1: number = this.cruiserAttack(this.getShips(fleet1, ShipType.CRUISER).quantity, fleet2);
      let remainingCruisersFleet2: number = this.cruiserAttack(this.getShips(fleet2, ShipType.CRUISER).quantity, fleet1);
      this.getShips(fleet1, ShipType.CRUISER).quantity = remainingCruisersFleet1;
      this.getShips(fleet2, ShipType.CRUISER).quantity = remainingCruisersFleet2;
      console.log("Fleet 1: " + fleet1.ships.map((nameQuantity: NameQuantity): string => nameQuantity.name + ": " + nameQuantity.quantity).join(", "));
      console.log("Fleet 2: " + fleet2.ships.map((nameQuantity: NameQuantity): string => nameQuantity.name + ": " + nameQuantity.quantity).join(", "));

      console.log("Battleships battle: ");
      let remainingBattleshipsFleet1: number = this.battleShipAttack(this.getShips(fleet1, ShipType.BATTLESHIP).quantity, fleet2);
      let remainingBattleshipsFleet2: number = this.battleShipAttack(this.getShips(fleet2, ShipType.BATTLESHIP).quantity, fleet1);
      this.getShips(fleet1, ShipType.BATTLESHIP).quantity = remainingBattleshipsFleet1;
      this.getShips(fleet2, ShipType.BATTLESHIP).quantity = remainingBattleshipsFleet2;
      console.log("Fleet 1: " + fleet1.ships.map((nameQuantity: NameQuantity): string => nameQuantity.name + ": " + nameQuantity.quantity).join(", "));
      console.log("Fleet 2: " + fleet2.ships.map((nameQuantity: NameQuantity): string => nameQuantity.name + ": " + nameQuantity.quantity).join(", "));

      requiredTurns++;
    }

    console.log("Battle ended in " + requiredTurns + " turns:");
    console.log("Fleet 1: " + fleet1.ships.map((nameQuantity: NameQuantity): string => nameQuantity.name + ": " + nameQuantity.quantity).join(", "));
    console.log("Fleet 2: " + fleet2.ships.map((nameQuantity: NameQuantity): string => nameQuantity.name + ": " + nameQuantity.quantity).join(", "));

    return requiredTurns;
  }

  private fightersAttack(fleetFighters: number, enemyFleet: Fleet): number {
    const REQUIRED_FOR_KILL: any = {
      [ShipType.BOMBER]: 3,
      [ShipType.FIGHTER]: 1.1,
      [ShipType.FRIGATE]: 40,
      [ShipType.DESTROYER]: 146,
      [ShipType.CRUISER]: 500,
      [ShipType.BATTLESHIP]: 4500,
    };

    return this.attack(fleetFighters, ShipType.FIGHTER, enemyFleet, REQUIRED_FOR_KILL);
  }

  private bombersAttack(fleetBombers: number, enemyFleet: Fleet): number {
    const REQUIRED_FOR_KILL: any = {
      [ShipType.DESTROYER]: 20,
      [ShipType.FRIGATE]: 4,
      [ShipType.BATTLESHIP]: 400,
      [ShipType.BOMBER]: 3.33,
      [ShipType.CRUISER]: 250
    };

    return this.attack(fleetBombers, ShipType.BOMBER, enemyFleet, REQUIRED_FOR_KILL);
  }

  private frigateAttack(fleetFrigates: number, enemyFleet: Fleet): number {
    const REQUIRED_FOR_KILL: any = {
      [ShipType.CRUISER]: 13,
      [ShipType.FIGHTER]: 0.09,
      [ShipType.DESTROYER]: 1.5,
      [ShipType.BOMBER]: 1.5,
      [ShipType.FRIGATE]: 2,
      [ShipType.BATTLESHIP]: 250,
    };

    return this.attack(fleetFrigates, ShipType.FRIGATE, enemyFleet, REQUIRED_FOR_KILL);
  }

  private destroyerAttack(fleetDestroyers: number, enemyFleet: Fleet): number {
    const REQUIRED_FOR_KILL: any = {
      [ShipType.BATTLESHIP]: 10,
      [ShipType.CRUISER]: 30.33,
      [ShipType.DESTROYER]: 1.66,
      [ShipType.FRIGATE]: 2.5,
      [ShipType.FIGHTER]: 0.166,
      [ShipType.BOMBER]: 0.5,
    };

    return this.attack(fleetDestroyers, ShipType.DESTROYER, enemyFleet, REQUIRED_FOR_KILL);
  }

  private cruiserAttack(fleetCruisers: number, enemyFleet: Fleet): number {
    const REQUIRED_FOR_KILL: any = {
      [ShipType.FIGHTER]: 0.009,
      [ShipType.BOMBER]: 0.027,
      [ShipType.FRIGATE]: 0.5,
      [ShipType.CRUISER]: 4,
      [ShipType.DESTROYER]: 5,
      [ShipType.BATTLESHIP]: 40,
    };

    return this.attack(fleetCruisers, ShipType.CRUISER, enemyFleet, REQUIRED_FOR_KILL);
  }

  private battleShipAttack(fleetBattleships: number, enemyFleet: Fleet): number {
    const REQUIRED_FOR_KILL: any = {
      [ShipType.FRIGATE]: 0.023,
      [ShipType.CRUISER]: 0.25,
      [ShipType.BATTLESHIP]: 3.031,
      [ShipType.FIGHTER]: 0.004,
      [ShipType.BOMBER]: 0.021,
      [ShipType.DESTROYER]: 0.5,
    };

    return this.attack(fleetBattleships, ShipType.BATTLESHIP, enemyFleet, REQUIRED_FOR_KILL);
  }

  private attack(fleetUnits: number, type: ShipType, enemyFleet: Fleet, requiredForKill: any): number {
    for (const targetType in requiredForKill) {
      const req: number = requiredForKill[targetType];
      const ship: NameQuantity = this.getShips(enemyFleet, targetType as ShipType);

      const potentialDamage: number = Math.ceil(fleetUnits / req);
      const actualDamage: number = ship.name !== type ? potentialDamage : ship.quantity;
      const remaining: number = Math.max(0, ship.quantity - actualDamage);

      fleetUnits = Math.max(0, fleetUnits - actualDamage * req);
      ship.quantity = remaining;

      if (fleetUnits === 0) return 0;
    }

    return fleetUnits;
  }

  private getShips(fleet: Fleet, shipType: ShipType): NameQuantity {
    return fleet.ships.filter((nameQuantity: NameQuantity): boolean => nameQuantity.name === shipType)[0];
  }

  private isFleetDestroyed(fleet: Fleet): boolean {
    return (fleet.ships.filter((nameQuantity: NameQuantity): boolean => nameQuantity.quantity > 0).length) === 0;
  }
}
