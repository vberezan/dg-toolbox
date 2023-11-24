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

      // -- fighters
      console.log("Fleet 1 attacking with fighters");
      let remainingFleet2: Fleet = this.fightersAttack(this.getShips(fleet1, ShipType.FIGHTER).quantity, fleet2);

      console.log("Fleet 2 attacking with fighters");
      let remainingFleet1: Fleet = this.fightersAttack(this.getShips(fleet2, ShipType.FIGHTER).quantity, fleet1);
      this.applyDamage(fleet1, remainingFleet1, fleet2, remainingFleet2);

      // -- bombers
      console.log("Fleet 1 attacking with bombers");
      remainingFleet2 = this.bombersAttack(this.getShips(fleet1, ShipType.BOMBER).quantity, fleet2);

      console.log("Fleet 2 attacking with bombers");
      remainingFleet1 = this.bombersAttack(this.getShips(fleet2, ShipType.BOMBER).quantity, fleet1);
      this.applyDamage(fleet1, remainingFleet1, fleet2, remainingFleet2);

      // -- frigates
      console.log("Fleet 1 attacking with frigates");
      remainingFleet2 = this.frigateAttack(this.getShips(fleet1, ShipType.FRIGATE).quantity, fleet2);

      console.log("Fleet 2 attacking with frigates");
      remainingFleet1 = this.frigateAttack(this.getShips(fleet2, ShipType.FRIGATE).quantity, fleet1);
      this.applyDamage(fleet1, remainingFleet1, fleet2, remainingFleet2);

      // -- destroyers
      console.log("Fleet 1 attacking with destroyers");
      remainingFleet2 = this.destroyerAttack(this.getShips(fleet1, ShipType.DESTROYER).quantity, fleet2);

      console.log("Fleet 2 attacking with destroyers");
      remainingFleet1 = this.destroyerAttack(this.getShips(fleet2, ShipType.DESTROYER).quantity, fleet1);
      this.applyDamage(fleet1, remainingFleet1, fleet2, remainingFleet2);

      // -- cruisers
      console.log("Fleet 1 attacking with cruisers");
      remainingFleet2 = this.cruiserAttack(this.getShips(fleet1, ShipType.CRUISER).quantity, fleet2);

      console.log("Fleet 2 attacking with cruisers");
      remainingFleet1 = this.cruiserAttack(this.getShips(fleet2, ShipType.CRUISER).quantity, fleet1);
      this.applyDamage(fleet1, remainingFleet1, fleet2, remainingFleet2);

      // -- battleships
      console.log("Fleet 1 attacking with battleships");
      remainingFleet2 = this.battleShipAttack(this.getShips(fleet1, ShipType.BATTLESHIP).quantity, fleet2);

      console.log("Fleet 2 attacking with battleships");
      remainingFleet1 = this.battleShipAttack(this.getShips(fleet2, ShipType.BATTLESHIP).quantity, fleet1);
      this.applyDamage(fleet1, remainingFleet1, fleet2, remainingFleet2);

      console.log("Fleet 1: " + fleet1.ships.map((nameQuantity: NameQuantity): string => nameQuantity.name + ": " + nameQuantity.quantity).join(", "));
      console.log("Fleet 2: " + fleet2.ships.map((nameQuantity: NameQuantity): string => nameQuantity.name + ": " + nameQuantity.quantity).join(", "));

      requiredTurns++;
    }

    console.log("Battle ended in " + requiredTurns + " turns:");
    console.log("Fleet 1: " + fleet1.ships.map((nameQuantity: NameQuantity): string => nameQuantity.name + ": " + nameQuantity.quantity).join(", "));
    console.log("Fleet 2: " + fleet2.ships.map((nameQuantity: NameQuantity): string => nameQuantity.name + ": " + nameQuantity.quantity).join(", "));

    return requiredTurns;
  }

  private applyDamage(fleet1: Fleet, remainingFleet1: Fleet, fleet2: Fleet, remainingFleet2: Fleet): void {
    fleet1.ships.forEach((ship: NameQuantity): void => {
      for (const ship2 of remainingFleet1.ships) {
        if (ship.name === ship2.name) {
          ship.quantity = ship2.quantity;
          break;
        }
      }
    });

    fleet2.ships.forEach((ship: NameQuantity): void => {
      for (const ship2 of remainingFleet2.ships) {
        if (ship.name === ship2.name) {
          ship.quantity = ship2.quantity;
          break;
        }
      }
    });
  }

  private fightersAttack(fleetFighters: number, enemyFleet: Fleet): Fleet {
    const REQUIRED_FOR_KILL: any = {
      [ShipType.BOMBER]: 3,
      [ShipType.FIGHTER]: 1.1,
      [ShipType.FRIGATE]: 40,
      [ShipType.DESTROYER]: 146,
      [ShipType.CRUISER]: 500,
      [ShipType.BATTLESHIP]: 4500,
    };

    console.log("Fighters attacking");
    return this.attack(fleetFighters, enemyFleet, REQUIRED_FOR_KILL);
  }

  private bombersAttack(fleetBombers: number, enemyFleet: Fleet): Fleet {
    const REQUIRED_FOR_KILL: any = {
      [ShipType.DESTROYER]: 20,
      [ShipType.FRIGATE]: 4,
      [ShipType.BATTLESHIP]: 400,
      [ShipType.BOMBER]: 3.33,
      [ShipType.CRUISER]: 250
    };

    console.log("Bombers attacking");
    return this.attack(fleetBombers, enemyFleet, REQUIRED_FOR_KILL);
  }

  private frigateAttack(fleetFrigates: number, enemyFleet: Fleet): Fleet {
    const REQUIRED_FOR_KILL: any = {
      [ShipType.CRUISER]: 13,
      [ShipType.FIGHTER]: 0.09,
      [ShipType.DESTROYER]: 1.5,
      [ShipType.BOMBER]: 1.5,
      [ShipType.FRIGATE]: 2,
      [ShipType.BATTLESHIP]: 250,
    };

    console.log("Frigates attacking");
    return this.attack(fleetFrigates, enemyFleet, REQUIRED_FOR_KILL);
  }

  private destroyerAttack(fleetDestroyers: number, enemyFleet: Fleet): Fleet {
    const REQUIRED_FOR_KILL: any = {
      [ShipType.BATTLESHIP]: 10,
      [ShipType.CRUISER]: 30.33,
      [ShipType.DESTROYER]: 1.66,
      [ShipType.FRIGATE]: 2.5,
      [ShipType.FIGHTER]: 0.166,
      [ShipType.BOMBER]: 0.5,
    };

    console.log("Destroyers attacking");
    return this.attack(fleetDestroyers, enemyFleet, REQUIRED_FOR_KILL);
  }

  private cruiserAttack(fleetCruisers: number, enemyFleet: Fleet): Fleet {
    const REQUIRED_FOR_KILL: any = {
      [ShipType.FIGHTER]: 0.009,
      [ShipType.BOMBER]: 0.027,
      [ShipType.FRIGATE]: 0.5,
      [ShipType.CRUISER]: 4,
      [ShipType.DESTROYER]: 5,
      [ShipType.BATTLESHIP]: 40,
    };

    console.log("Cruisers attacking");
    return this.attack(fleetCruisers, enemyFleet, REQUIRED_FOR_KILL);
  }

  private battleShipAttack(fleetBattleships: number, enemyFleet: Fleet): Fleet {
    const REQUIRED_FOR_KILL: any = {
      [ShipType.FRIGATE]: 0.023,
      [ShipType.CRUISER]: 0.25,
      [ShipType.BATTLESHIP]: 3.031,
      [ShipType.FIGHTER]: 0.004,
      [ShipType.BOMBER]: 0.021,
      [ShipType.DESTROYER]: 0.5,
    };

    console.log("Battleships attacking");
    return this.attack(fleetBattleships, enemyFleet, REQUIRED_FOR_KILL);
  }

  private attack(attackingUnits: number, enemyFleet: Fleet, requiredForKill: any): Fleet {
    let result: Fleet = new Fleet();
    for (const targetType in requiredForKill) {
      const requiredToKill: number = requiredForKill[targetType];
      const enemyShipGroup: NameQuantity = this.getShips(enemyFleet, targetType as ShipType);

      if (enemyShipGroup.quantity > 0) {
        const killedUnits: number = Math.min(enemyShipGroup.quantity, Math.ceil(attackingUnits / requiredToKill));

        console.log("Killed " + killedUnits + " " + targetType + " with " + attackingUnits + " attacking units");

        result.ships.push(new NameQuantity(targetType as ShipType, enemyShipGroup.quantity - killedUnits));
      }
    }

    return result;
  }

  private getShips(fleet: Fleet, name: string): NameQuantity {
    return fleet.ships.filter((nameQuantity: NameQuantity): boolean => nameQuantity.name === name)[0];
  }

  private isFleetDestroyed(fleet: Fleet): boolean {
    return (fleet.ships.filter((nameQuantity: NameQuantity): boolean => nameQuantity.quantity > 0).length) === 0;
  }
}
