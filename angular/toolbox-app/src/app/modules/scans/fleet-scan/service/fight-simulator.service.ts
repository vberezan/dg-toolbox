import {Injectable} from '@angular/core';
import {Fleet} from "../../../../shared/model/fleet/fleet.model";
import {ShipType} from "../../../../shared/model/fleet/ship-type";
import {NameQuantity} from "../../../../shared/model/name-quantity.model";
import {KillRate} from "../../../../shared/model/fleet/kill-rate.model";

@Injectable({
  providedIn: 'root'
})
export class FightSimulatorService {

  simulateFight(fleet1: Fleet, fleet2: Fleet): number {
    let requiredTurns: number = 0;

    console.log('Starting the battle');

    while (!this.isFleetDestroyed(fleet1) && !this.isFleetDestroyed(fleet2)) {
      let copyF1 = JSON.parse(JSON.stringify(fleet1));
      let copyF2 = JSON.parse(JSON.stringify(fleet2));

      // -- fighters
      this.fightersAttack(this.getShips(copyF1, ShipType.FIGHTER).quantity, fleet2);
      this.fightersAttack(this.getShips(copyF2, ShipType.FIGHTER).quantity, fleet1);

      copyF1 = JSON.parse(JSON.stringify(fleet1));
      copyF2 = JSON.parse(JSON.stringify(fleet2));

      // -- bombers
      this.bombersAttack(this.getShips(fleet1, ShipType.BOMBER).quantity, fleet2);
      this.bombersAttack(this.getShips(fleet2, ShipType.BOMBER).quantity, fleet1);

      copyF1 = JSON.parse(JSON.stringify(fleet1));
      copyF2 = JSON.parse(JSON.stringify(fleet2));

      // -- frigates
      this.frigateAttack(this.getShips(fleet1, ShipType.FRIGATE).quantity, fleet2);
      this.frigateAttack(this.getShips(fleet2, ShipType.FRIGATE).quantity, fleet1);

      copyF1 = JSON.parse(JSON.stringify(fleet1));
      copyF2 = JSON.parse(JSON.stringify(fleet2));

      // -- destroyers
      this.destroyerAttack(this.getShips(fleet1, ShipType.DESTROYER).quantity, fleet2);
      this.destroyerAttack(this.getShips(fleet2, ShipType.DESTROYER).quantity, fleet1);

      copyF1 = JSON.parse(JSON.stringify(fleet1));
      copyF2 = JSON.parse(JSON.stringify(fleet2));

      // -- cruisers
      this.cruiserAttack(this.getShips(fleet1, ShipType.CRUISER).quantity, fleet2);
      this.cruiserAttack(this.getShips(fleet2, ShipType.CRUISER).quantity, fleet1);

      copyF1 = JSON.parse(JSON.stringify(fleet1));
      copyF2 = JSON.parse(JSON.stringify(fleet2));

      // -- battleships
      this.battleShipAttack(this.getShips(fleet1, ShipType.BATTLESHIP).quantity, fleet2);
      this.battleShipAttack(this.getShips(fleet2, ShipType.BATTLESHIP).quantity, fleet1);

      copyF1 = JSON.parse(JSON.stringify(fleet1));
      copyF2 = JSON.parse(JSON.stringify(fleet2));


      console.log("Fleet 1: " + fleet1.ships.map((nameQuantity: NameQuantity): string => nameQuantity.name + ": " + nameQuantity.quantity).join(", "));
      console.log("Fleet 2: " + fleet2.ships.map((nameQuantity: NameQuantity): string => nameQuantity.name + ": " + nameQuantity.quantity).join(", "));

      requiredTurns++;
    }

    console.log("Battle ended in " + requiredTurns + " turns:");
    console.log("Fleet 1: " + fleet1.ships.map((nameQuantity: NameQuantity): string => nameQuantity.name + ": " + nameQuantity.quantity).join(", "));
    console.log("Fleet 2: " + fleet2.ships.map((nameQuantity: NameQuantity): string => nameQuantity.name + ": " + nameQuantity.quantity).join(", "));

    return requiredTurns;
  }

  private fightersAttack(fleetFighters: number, enemyFleet: Fleet): void {
    const damageTable: KillRate[]  = [
      new KillRate(ShipType.BOMBER, 0.33333),
      new KillRate(ShipType.FIGHTER, 0.91),
      new KillRate(ShipType.FRIGATE, 0.025),
      new KillRate(ShipType.DESTROYER, 0.006),
      new KillRate(ShipType.CRUISER, 0.002),
      new KillRate(ShipType.BATTLESHIP, 0.0002)
    ];

    this.attack(fleetFighters, ShipType.FIGHTER, enemyFleet, damageTable);
  }

  private bombersAttack(fleetBombers: number, enemyFleet: Fleet): void {
    const damageTable: KillRate[] = [
      new KillRate(ShipType.DESTROYER, 0.05),
      new KillRate(ShipType.FRIGATE, 0.25),
      new KillRate(ShipType.BATTLESHIP, 0.002),
      new KillRate(ShipType.BOMBER, 0.3),
      new KillRate(ShipType.CRUISER, 0.004)
    ];

    this.attack(fleetBombers, ShipType.BOMBER, enemyFleet, damageTable);
  }

  private frigateAttack(fleetFrigates: number, enemyFleet: Fleet): void {
    const damageTable: KillRate[] = [
      new KillRate(ShipType.CRUISER, 0.083),
      new KillRate(ShipType.FIGHTER, 12.12),
      new KillRate(ShipType.DESTROYER, 0.666),
      new KillRate(ShipType.BOMBER, 0.7),
      new KillRate(ShipType.FRIGATE, 0.5),
      new KillRate(ShipType.BATTLESHIP, 250)
    ];

    this.attack(fleetFrigates, ShipType.FRIGATE, enemyFleet, damageTable);
  }

  private destroyerAttack(fleetDestroyers: number, enemyFleet: Fleet): void {
    const damageTable: KillRate[] = [
      new KillRate(ShipType.BATTLESHIP, 0.1),
      new KillRate(ShipType.CRUISER, 0.33),
      new KillRate(ShipType.DESTROYER, 0.6),
      new KillRate(ShipType.FRIGATE, 0.4),
      new KillRate(ShipType.FIGHTER, 6),
      new KillRate(ShipType.BOMBER, 2)
    ];

    this.attack(fleetDestroyers, ShipType.DESTROYER, enemyFleet, damageTable);
  }

  private cruiserAttack(fleetCruisers: number, enemyFleet: Fleet): void {
    const damageTable: KillRate[] = [
      new KillRate(ShipType.FIGHTER, 114),
      new KillRate(ShipType.BOMBER, 37.75),
      new KillRate(ShipType.FRIGATE, 2),
      new KillRate(ShipType.CRUISER, 0.25),
      new KillRate(ShipType.DESTROYER, 0.2),
      new KillRate(ShipType.BATTLESHIP, 0.025)
    ];

    this.attack(fleetCruisers, ShipType.CRUISER, enemyFleet, damageTable);
  }

  private battleShipAttack(fleetBattleships: number, enemyFleet: Fleet): void {
    const damageTable: KillRate[] = [
      new KillRate(ShipType.FRIGATE, 44),
      new KillRate(ShipType.CRUISER, 4),
      new KillRate(ShipType.BATTLESHIP, 0.33),
      new KillRate(ShipType.FIGHTER, 330),
      new KillRate(ShipType.BOMBER, 48),
      new KillRate(ShipType.DESTROYER, 2)
    ];

    this.attack(fleetBattleships, ShipType.BATTLESHIP, enemyFleet, damageTable);
  }

  private attack(attackingUnits: number, attacker: ShipType, enemyFleet: Fleet, damageTable: KillRate[]): void {
    for (const killRate of damageTable) {
      const rate: number = killRate.rate;
      const enemyShipGroup: NameQuantity = this.getShips(enemyFleet, killRate.target);

      if (enemyShipGroup.quantity > 0 && attackingUnits > 0) {
        const killedUnits: number = Math.min(enemyShipGroup.quantity, Math.floor(rate * attackingUnits));
        console.log(Math.floor( killedUnits / rate) + " " + attacker + " killed " + killedUnits + " " + killRate.target);

        enemyShipGroup.quantity = Math.max(0, enemyShipGroup.quantity - killedUnits);
        attackingUnits = Math.max(0, attackingUnits - Math.ceil(killedUnits / rate));
      }
    }
  }

  private getShips(fleet: Fleet, name: string): NameQuantity {
    return fleet.ships.filter((nameQuantity: NameQuantity): boolean => nameQuantity.name === name)[0];
  }

  private isFleetDestroyed(fleet: Fleet): boolean {
    return (fleet.ships.filter((nameQuantity: NameQuantity): boolean => nameQuantity.quantity > 0).length) === 0;
  }
}
