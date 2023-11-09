import {inject, Injectable} from '@angular/core';
import {firstValueFrom} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class NavigationMatrixService {
  private httpClient: HttpClient = inject(HttpClient);

  constructor() {
  }

  private delay = async (ms: number) => new Promise(res => setTimeout(res, ms));

  generateNavigationCoordinates(): string[] {
    let result: string[] = [];
    const galaxies: number = 49;
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
            for (let planet: number = 1; planet <= g1Planets; planet++) {
              result.push(galaxy + '.' + sector + '.' + system + '.' + planet);
            }
          }
        }
      }

      if (galaxy > 1 && galaxy < 14) {
        for (let sector: number = 1; sector <= innerSectors; sector++) {
          for (let system: number = 1; system <= systems; system++) {
            for (let planet: number = 1; planet <= innerPlanets; planet++) {
              result.push(galaxy + '.' + sector + '.' + system + '.' + planet);
            }
          }
        }
      }

      if (galaxy >= 14) {
        for (let sector: number = 1; sector <= outerSectors; sector++) {
          for (let system: number = 1; system <= systems; system++) {
            for (let planet: number = 1; planet <= outerPlanets; planet++) {
              result.push(galaxy + '.' + sector + '.' + system + '.' + planet);
            }
          }
        }
      }
    }


    return result;
  }

  async extractData(galaxy: number, sector: number, system: number): Promise<void> {
    console.log('Waiting for 5s...');
    await this.delay(5000);

    let source:string = await firstValueFrom(this.httpClient.get('https://andromeda.darkgalaxy.com/navigation/' + galaxy + '/' + sector + '/' + system, {responseType: 'text'}));

    let dp: DOMParser = new DOMParser();
    let dd: Document = dp.parseFromString(source, 'text/html');
    dd.querySelectorAll('.navigation .planets').forEach(planet => {
      let display: string = planet.querySelector('.coords span').textContent.trim() + ' - ';

      if (planet.classList.contains('neutral')) {
        display += 'Uninhabited';
      } else {
        if (planet.querySelector('.allianceName')) {
          display += planet.querySelector('.allianceName').textContent.trim();
        }

        display += planet.querySelector('.playerName').textContent.trim();
      }

      console.log(display);
    });
  }
}
