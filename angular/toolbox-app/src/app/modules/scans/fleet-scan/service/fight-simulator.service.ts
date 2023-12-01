import {Injectable, Optional} from '@angular/core';
import {Fleet} from "../../../../shared/model/fleet/fleet.model";
import {ShipType} from "../../../../shared/model/fleet/ship-type";
import {NameQuantity} from "../../../../shared/model/name-quantity.model";
import {KillRate} from "../../../../shared/model/fleet/kill-rate.model";

@Injectable({
  providedIn: 'root'
})
export class FightSimulatorService {

  createSimulation(fleets: Fleet[]): void {
    document.querySelectorAll('.dgt-fight-simulation-container').forEach((fightSimulationContainer: Element): void => {
      const fightSimulation: Element = fightSimulationContainer.querySelector('.dgt-fight-simulation');

      const eta: number = parseInt(fightSimulation.attributes.getNamedItem('eta').value);
      const groupedFleets: Map<string, Fleet[]> = new Map<string, Fleet[]>();
      const totalFleets: Map<string, Fleet> = new Map<string, Fleet>();

      // -- group fleets by type
      fleets.forEach((fleet: Fleet): void => {
        const key: string = fleet.hostile ? 'hostile' : 'allied';

        if (fleet.eta <= eta) {
          groupedFleets.has(key) ? groupedFleets.get(key).push(fleet) : groupedFleets.set(key, [fleet]);
        }
      });

      // -- merge fleets of the same type
      groupedFleets.forEach((fleetGroup: Fleet[], key: string): void => {
        totalFleets.set(key, this.totalFleet(fleetGroup));
      });


      let alliedUnitsBefore: number = 0;
      let hostileUnitsBefore: number = 0;
      let alliedUnitsAfter: number = 0;
      let hostileUnitsAfter: number = 0;

      // -- update table
      totalFleets.forEach((fleet: Fleet, key: string): void => {
        fleet.hostile = key === 'hostile';
        fleet.allied = key === 'allied';
        let metalUnits: number = 0;
        let mineralUnits: number = 0;

        fleet.ships.forEach((ship: NameQuantity): void => {
          switch (ship.name as ShipType) {
            case ShipType.FIGHTER:
              mineralUnits += 0;
              metalUnits += ship.quantity * 2000;
              break;
            case ShipType.BOMBER:
              mineralUnits += ship.quantity * 4000;
              metalUnits += 0;
              break;
            case ShipType.FRIGATE:
              metalUnits += ship.quantity * 12000;
              mineralUnits += ship.quantity * 8000;
              break;
            case ShipType.DESTROYER:
              metalUnits += ship.quantity * 40000;
              mineralUnits += ship.quantity * 40000;
              break;
            case ShipType.CRUISER:
              metalUnits += ship.quantity * 120000;
              mineralUnits += ship.quantity * 60000;
              break;
            case ShipType.BATTLESHIP:
              metalUnits += ship.quantity * 600000;
              mineralUnits += ship.quantity * 400000;
              break;
            default:
              break;
          }

          fightSimulationContainer.querySelector('.dgt-fight-simulator-by-rof tr.' + ship.name + ' td.before.' + key).innerHTML = ship.quantity.toLocaleString('en-US', {maximumFractionDigits: 0, minimumFractionDigits: 0});
        });

        if (fleet.allied) {
          alliedUnitsBefore += metalUnits/1.5 + mineralUnits;
        } else {
          hostileUnitsBefore += metalUnits/1.5 + mineralUnits;
        }

        fightSimulationContainer.querySelector('.dgt-fight-simulator-by-rof tr.resource-row.metal td.before.' + key).innerHTML = metalUnits.toLocaleString('en-US', {maximumFractionDigits: 0, minimumFractionDigits: 0});
        fightSimulationContainer.querySelector('.dgt-fight-simulator-by-rof tr.resource-row.mineral td.before.' + key).innerHTML = mineralUnits.toLocaleString('en-US', {maximumFractionDigits: 0, minimumFractionDigits: 0});
      });

      // -- simulate fight
      const fightResult: Map<string, Fleet> = this.simulateFight(totalFleets.get('allied'), totalFleets.get('hostile'), 1);

      // -- update table
      fightResult.forEach((fleet: Fleet, key: string): void => {
        let metalUnits: number = 0;
        let mineralUnits: number = 0;

        fleet.ships.forEach((ship: NameQuantity): void => {
          switch (ship.name as ShipType) {
            case ShipType.FIGHTER:
              mineralUnits += 0;
              metalUnits += ship.quantity * 2000;
              break;
            case ShipType.BOMBER:
              mineralUnits += ship.quantity * 4000;
              metalUnits += 0;
              break;
            case ShipType.FRIGATE:
              metalUnits += ship.quantity * 12000;
              mineralUnits += ship.quantity * 8000;
              break;
            case ShipType.DESTROYER:
              metalUnits += ship.quantity * 40000;
              mineralUnits += ship.quantity * 40000;
              break;
            case ShipType.CRUISER:
              metalUnits += ship.quantity * 120000;
              mineralUnits += ship.quantity * 60000;
              break;
            case ShipType.BATTLESHIP:
              metalUnits += ship.quantity * 600000;
              mineralUnits += ship.quantity * 400000;
              break;
            default:
              break;
          }

          fightSimulationContainer.querySelector('.dgt-fight-simulator-by-rof tr.' + ship.name + ' td.after.' + key).innerHTML = ship.quantity.toLocaleString('en-US', {maximumFractionDigits: 0, minimumFractionDigits: 0});
        });

        if (fleet.allied) {
          alliedUnitsAfter += metalUnits/1.5 + mineralUnits;
        } else {
          hostileUnitsAfter += metalUnits/1.5 + mineralUnits;
        }

        fightSimulationContainer.querySelector('.dgt-fight-simulator-by-rof tr.resource-row.metal td.after.' + key).innerHTML = metalUnits.toLocaleString('en-US', {maximumFractionDigits: 0, minimumFractionDigits: 0});
        fightSimulationContainer.querySelector('.dgt-fight-simulator-by-rof tr.resource-row.mineral td.after.' + key).innerHTML = mineralUnits.toLocaleString('en-US', {maximumFractionDigits: 0, minimumFractionDigits: 0});
      });

      fightSimulationContainer.querySelector('.dgt-fight-simulator-by-rof tr.resource-row.total td.allied').innerHTML = (alliedUnitsBefore - alliedUnitsAfter).toLocaleString('en-US', {maximumFractionDigits: 0, minimumFractionDigits: 0});
      fightSimulationContainer.querySelector('.dgt-fight-simulator-by-rof tr.resource-row.total td.hostile').innerHTML = (hostileUnitsBefore - hostileUnitsAfter).toLocaleString('en-US', {maximumFractionDigits: 0, minimumFractionDigits: 0});
    });
  }

  private totalFleet(scannedFleet: Fleet[]): Fleet {
    let result: Fleet = new Fleet();

    result.ships.push(new NameQuantity(ShipType.FIGHTER, 0));
    result.ships.push(new NameQuantity(ShipType.BOMBER, 0));
    result.ships.push(new NameQuantity(ShipType.FRIGATE, 0));
    result.ships.push(new NameQuantity(ShipType.DESTROYER, 0));
    result.ships.push(new NameQuantity(ShipType.CRUISER, 0));
    result.ships.push(new NameQuantity(ShipType.BATTLESHIP, 0));

    for (let fleet of scannedFleet) {
      // combine fleets
      for (const ship of fleet.ships) {
        this.getShips(result, ship.name).quantity += ship.quantity;
      }
    }

    return result;
  }

  private simulateFight(fleet1: Fleet, fleet2: Fleet, @Optional() turns: number = 1): Map<string, Fleet> {
    let requiredTurns: number = 0;

    while (!this.isFleetDestroyed(fleet1) && !this.isFleetDestroyed(fleet2) && requiredTurns < turns) {
      let copyF1 = JSON.parse(JSON.stringify(fleet1));
      let copyF2 = JSON.parse(JSON.stringify(fleet2));

      // -- fighters
      this.fightersAttack(this.getShips(copyF1, ShipType.FIGHTER).quantity, fleet2);
      this.fightersAttack(this.getShips(copyF2, ShipType.FIGHTER).quantity, fleet1);

      // -- bombers
      this.bombersAttack(this.getShips(copyF1, ShipType.BOMBER).quantity, fleet2);
      this.bombersAttack(this.getShips(copyF2, ShipType.BOMBER).quantity, fleet1);

      // -- frigates
      this.frigateAttack(this.getShips(copyF1, ShipType.FRIGATE).quantity, fleet2);
      this.frigateAttack(this.getShips(copyF2, ShipType.FRIGATE).quantity, fleet1);

      // -- destroyers
      this.destroyerAttack(this.getShips(copyF1, ShipType.DESTROYER).quantity, fleet2);
      this.destroyerAttack(this.getShips(copyF2, ShipType.DESTROYER).quantity, fleet1);

      // -- cruisers
      this.cruiserAttack(this.getShips(copyF1, ShipType.CRUISER).quantity, fleet2);
      this.cruiserAttack(this.getShips(copyF2, ShipType.CRUISER).quantity, fleet1);

      // -- battleships
      this.battleShipAttack(this.getShips(copyF1, ShipType.BATTLESHIP).quantity, fleet2);
      this.battleShipAttack(this.getShips(copyF2, ShipType.BATTLESHIP).quantity, fleet1);

      requiredTurns++;
    }

    return new Map<string, Fleet>([fleet1.hostile ? ['hostile', fleet1] : ['allied', fleet1], fleet2.hostile ? ['hostile', fleet2] : ['allied', fleet2]]);
  }

  private fightersAttack(fleetFighters: number, enemyFleet: Fleet): void {
    const damageTable: KillRate[] = [
      new KillRate(ShipType.BOMBER, 0.33333),
      new KillRate(ShipType.FIGHTER, 0.90999),
      new KillRate(ShipType.FRIGATE, 0.02532),
      new KillRate(ShipType.DESTROYER, 0.00684),
      new KillRate(ShipType.CRUISER, 0.002),
      new KillRate(ShipType.BATTLESHIP, 0.00022)
    ];

    this.attack(fleetFighters, ShipType.FIGHTER, enemyFleet, damageTable);
  }

  private bombersAttack(fleetBombers: number, enemyFleet: Fleet): void {
    const damageTable: KillRate[] = [
      new KillRate(ShipType.DESTROYER, 0.05),
      new KillRate(ShipType.FRIGATE, 0.25),
      new KillRate(ShipType.BATTLESHIP, 0.0025),
      new KillRate(ShipType.BOMBER, 0.29999),
      new KillRate(ShipType.CRUISER, 0.004)
    ];

    this.attack(fleetBombers, ShipType.BOMBER, enemyFleet, damageTable);
  }

  private frigateAttack(fleetFrigates: number, enemyFleet: Fleet): void {
    const damageTable: KillRate[] = [
      new KillRate(ShipType.CRUISER, 0.08332),
      new KillRate(ShipType.FIGHTER, 12.11999),
      new KillRate(ShipType.DESTROYER, 0.66666),
      new KillRate(ShipType.BOMBER, 0.69999),
      new KillRate(ShipType.FRIGATE, 0.5),
      new KillRate(ShipType.BATTLESHIP, 0.004)
    ];

    this.attack(fleetFrigates, ShipType.FRIGATE, enemyFleet, damageTable);
  }

  private destroyerAttack(fleetDestroyers: number, enemyFleet: Fleet): void {
    const damageTable: KillRate[] = [
      new KillRate(ShipType.BATTLESHIP, 0.1),
      new KillRate(ShipType.CRUISER, 0.32999),
      new KillRate(ShipType.DESTROYER, 0.59999),
      new KillRate(ShipType.FRIGATE, 0.4),
      new KillRate(ShipType.FIGHTER, 5.99988),
      new KillRate(ShipType.BOMBER, 2)
    ];

    this.attack(fleetDestroyers, ShipType.DESTROYER, enemyFleet, damageTable);
  }

  private cruiserAttack(fleetCruisers: number, enemyFleet: Fleet): void {
    const damageTable: KillRate[] = [
      new KillRate(ShipType.FIGHTER, 113.89521),
      new KillRate(ShipType.BOMBER, 37.73584),
      new KillRate(ShipType.FRIGATE, 2),
      new KillRate(ShipType.CRUISER, 0.25),
      new KillRate(ShipType.DESTROYER, 0.2),
      new KillRate(ShipType.BATTLESHIP, 0.025)
    ];

    this.attack(fleetCruisers, ShipType.CRUISER, enemyFleet, damageTable);
  }

  private battleShipAttack(fleetBattleships: number, enemyFleet: Fleet): void {
    const damageTable: KillRate[] = [
      new KillRate(ShipType.FRIGATE, 43.99472),
      new KillRate(ShipType.CRUISER, 4),
      new KillRate(ShipType.BATTLESHIP, 0.32999),
      new KillRate(ShipType.FIGHTER, 328.947368),
      new KillRate(ShipType.BOMBER, 47.98464),
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
