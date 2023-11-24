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
    let fleet1Fights: Fleet[] = [];
    let fleet2Fights: Fleet[] = [];

    console.log('Starting the battle');

    while (!this.isFleetDestroyed(fleet1) && !this.isFleetDestroyed(fleet2)) {

      // -- fighters
      fleet2Fights.push(this.fightersAttack(this.getShips(fleet1, ShipType.FIGHTER).quantity, fleet2));
      fleet1Fights.push(this.fightersAttack(this.getShips(fleet2, ShipType.FIGHTER).quantity, fleet1));

      // -- bombers
      fleet2Fights.push(this.bombersAttack(this.getShips(fleet1, ShipType.BOMBER).quantity, fleet2));
      fleet1Fights.push(this.bombersAttack(this.getShips(fleet2, ShipType.BOMBER).quantity, fleet1));

      // -- frigates
      fleet2Fights.push(this.frigateAttack(this.getShips(fleet1, ShipType.FRIGATE).quantity, fleet2));
      fleet1Fights.push(this.frigateAttack(this.getShips(fleet2, ShipType.FRIGATE).quantity, fleet1));

      // -- destroyers
      fleet2Fights.push(this.destroyerAttack(this.getShips(fleet1, ShipType.DESTROYER).quantity, fleet2));
      fleet1Fights.push(this.destroyerAttack(this.getShips(fleet2, ShipType.DESTROYER).quantity, fleet1));

      // -- cruisers
      fleet2Fights.push(this.cruiserAttack(this.getShips(fleet1, ShipType.CRUISER).quantity, fleet2));
      fleet1Fights.push(this.cruiserAttack(this.getShips(fleet2, ShipType.CRUISER).quantity, fleet1));

      // -- battleships
      fleet2Fights.push(this.battleShipAttack(this.getShips(fleet1, ShipType.BATTLESHIP).quantity, fleet2));
      fleet1Fights.push(this.battleShipAttack(this.getShips(fleet2, ShipType.BATTLESHIP).quantity, fleet1));


      this.applyDamage(fleet1, fleet2, fleet1Fights, fleet2Fights);

      console.log("Fleet 1: " + fleet1.ships.map((nameQuantity: NameQuantity): string => nameQuantity.name + ": " + nameQuantity.quantity).join(", "));
      console.log("Fleet 2: " + fleet2.ships.map((nameQuantity: NameQuantity): string => nameQuantity.name + ": " + nameQuantity.quantity).join(", "));

      requiredTurns++;
    }

    console.log("Battle ended in " + requiredTurns + " turns:");
    console.log("Fleet 1: " + fleet1.ships.map((nameQuantity: NameQuantity): string => nameQuantity.name + ": " + nameQuantity.quantity).join(", "));
    console.log("Fleet 2: " + fleet2.ships.map((nameQuantity: NameQuantity): string => nameQuantity.name + ": " + nameQuantity.quantity).join(", "));

    return requiredTurns;
  }

  private applyDamage(fleet1: Fleet, fleet2: Fleet, f1Fights: Fleet[], f2Fights: Fleet[]): void {

    for (let i: number = 0; i < f1Fights.length; i++) {
      const fleet1Fight: Fleet = f1Fights[i];

      fleet1.ships.forEach((ship: NameQuantity): void => {
        for (const ship2 of fleet1Fight.ships) {
          if (ship.name === ship2.name) {
            ship.quantity -= ship2.quantity;
            break;
          }
        }
      });
    }

    for (let i: number = 0; i < f2Fights.length; i++) {
      const fleet2Fight: Fleet = f2Fights[i];

      fleet2.ships.forEach((ship: NameQuantity): void => {
        for (const ship2 of fleet2Fight.ships) {
          if (ship.name === ship2.name) {
            ship.quantity -= ship2.quantity;
            break;
          }
        }
      });
    }
  }

  private fightersAttack(fleetFighters: number, enemyFleet: Fleet): Fleet {
    const damageTable: any = {
      [ShipType.BOMBER]: 0.333,
      [ShipType.FIGHTER]: 0.91,
      [ShipType.FRIGATE]: 0.025,
      [ShipType.DESTROYER]: 0.006,
      [ShipType.CRUISER]: 0.002,
      [ShipType.BATTLESHIP]: 0.0002,
    };

    return this.attack(fleetFighters, ShipType.FIGHTER, enemyFleet, damageTable);
  }

  private bombersAttack(fleetBombers: number, enemyFleet: Fleet): Fleet {
    const damageTable: any = {
      [ShipType.DESTROYER]: 0.05,
      [ShipType.FRIGATE]: 0.25,
      [ShipType.BATTLESHIP]: 0.002,
      [ShipType.BOMBER]: 0.3,
      [ShipType.CRUISER]: 0.004
    };

    return this.attack(fleetBombers, ShipType.BOMBER, enemyFleet, damageTable);
  }

  private frigateAttack(fleetFrigates: number, enemyFleet: Fleet): Fleet {
    const damageTable: any = {
      [ShipType.CRUISER]: 0.083,
      [ShipType.FIGHTER]: 12.12,
      [ShipType.DESTROYER]: 0.666,
      [ShipType.BOMBER]: 0.7,
      [ShipType.FRIGATE]: 0.5,
      [ShipType.BATTLESHIP]: 250,
    };

    return this.attack(fleetFrigates, ShipType.FRIGATE, enemyFleet, damageTable);
  }

  private destroyerAttack(fleetDestroyers: number, enemyFleet: Fleet): Fleet {
    const damageTable: any = {
      [ShipType.BATTLESHIP]: 0.1,
      [ShipType.CRUISER]: 0.33,
      [ShipType.DESTROYER]: 0.6,
      [ShipType.FRIGATE]: 0.4,
      [ShipType.FIGHTER]: 6,
      [ShipType.BOMBER]: 2,
    };

    return this.attack(fleetDestroyers, ShipType.DESTROYER, enemyFleet, damageTable);
  }

  private cruiserAttack(fleetCruisers: number, enemyFleet: Fleet): Fleet {
    const damageTable: any = {
      [ShipType.FIGHTER]: 114,
      [ShipType.BOMBER]: 37.75,
      [ShipType.FRIGATE]: 2,
      [ShipType.CRUISER]: 0.25,
      [ShipType.DESTROYER]: 0.2,
      [ShipType.BATTLESHIP]: 0.025,
    };

    return this.attack(fleetCruisers, ShipType.CRUISER, enemyFleet, damageTable);
  }

  private battleShipAttack(fleetBattleships: number, enemyFleet: Fleet): Fleet {
    const damageTable: any = {
      [ShipType.FRIGATE]: 44,
      [ShipType.CRUISER]: 4,
      [ShipType.BATTLESHIP]: 0.33,
      [ShipType.FIGHTER]: 330,
      [ShipType.BOMBER]: 48,
      [ShipType.DESTROYER]: 2,
    };

    return this.attack(fleetBattleships, ShipType.BATTLESHIP, enemyFleet, damageTable);
  }

  private attack(attackingUnits: number, attacker: ShipType, enemyFleet: Fleet, damageTable: any): Fleet {
    let result: Fleet = new Fleet();
    for (const targetType of damageTable) {
      const damage: number = damageTable[targetType];
      const enemyShipGroup: NameQuantity = this.getShips(enemyFleet, targetType as ShipType);

      if (enemyShipGroup.quantity > 0 && attackingUnits > 0) {
        const killedUnits: number = Math.min(enemyShipGroup.quantity, Math.floor(damage * attackingUnits));

        if (attackingUnits > 0) {
          console.log("Killed " + killedUnits + " " + targetType + " engaging " + Math.ceil(killedUnits / damage) +
            " " + attacker + "s. Units not engaged: " + Math.floor(Math.max(0, (attackingUnits - killedUnits / damage))));
        }

        result.ships.push(new NameQuantity(targetType as ShipType, killedUnits));
        attackingUnits = Math.max(0, attackingUnits - Math.ceil(killedUnits / damage));
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
