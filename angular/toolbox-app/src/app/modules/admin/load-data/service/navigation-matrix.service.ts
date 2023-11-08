import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavigationMatrixService {

  constructor() {
    console.log(this.generateNavigationCoordinates());
  }

  generateNavigationCoordinates(): string[] {
    let result: string[] = [];
    const galaxies:number = 49;
    const g1Sectors: number = 25;
    const innerSectors: number = 6;
    const outerSectors: number = 2;
    const systems: number = 4;
    const g1Planets: number = 12;
    const innerPlanets: number = 9;
    const outerPlanets: number = 9;

    for (let galaxy: number = 1; galaxy <= galaxies; galaxy++) {
      if (galaxy === 1) {
        for (let sector: number = 1; sector <= g1Sectors; sector++) {
          for (let system: number = 1; system <= systems; system++) {
            for (let planet: number = 1; planet <= g1Planets; planet++ ) {
              result.push(galaxy + '.' + sector  + '.' + system + '.' + planet);
            }
          }
        }
      }

      if (galaxy > 1 && galaxy < 14) {
        for (let sector: number = 1; sector <= innerSectors; sector++) {
          for (let system: number = 1; system <= systems; system++) {
            for (let planet: number = 1; planet <= innerPlanets; planet++ ) {
              result.push(galaxy + '.' + sector  + '.' + system + '.' + planet);
            }
          }
        }
      }

      if (galaxy >= 14) {
        for (let sector: number = 1; sector <= outerSectors; sector++) {
          for (let system: number = 1; system <= systems; system++) {
            for (let planet: number = 1; planet <= outerPlanets; planet++ ) {
              result.push(galaxy + '.' + sector  + '.' + system + '.' + planet);
            }
          }
        }
      }
    }


    return result;
  }
}
