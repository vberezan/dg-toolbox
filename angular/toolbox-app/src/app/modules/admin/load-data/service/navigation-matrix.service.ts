import {EventEmitter, inject, Injectable, Optional} from '@angular/core';
import {firstValueFrom} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class NavigationMatrixService {
  private httpClient: HttpClient = inject(HttpClient);
  private readonly NAVIGATION_BASE_URL: string = 'https://andromeda.darkgalaxy.com/navigation/';
  private readonly GALAXIES: number = 49;
  private readonly G1_SECTORS: number = 25;
  private readonly INNER_SECTORS: number = 6;
  private readonly OUTER_SECTORS: number = 2;
  private readonly SYSTEMS: number = 4;
  private _navigationMatrixSystemLoadEmitter: EventEmitter<number> = new EventEmitter();
  private _navigationMatrixPlanetLoadEmitter: EventEmitter<string> = new EventEmitter();

  private delay = async (ms: number): Promise<unknown> => new Promise(res => setTimeout(res, ms));

  async extractGalaxies(@Optional() galaxies: number[] = []): Promise<void> {
    let scanGalaxies: number[] = this.filterValidGalaxies(galaxies);
    let executed: number = 0;

    for (let g: number = 0; g < scanGalaxies.length; g++) {

      if (scanGalaxies[g] === 1) {
        for (let se: number = 1; se <= this.G1_SECTORS; se++) {
          for (let sy: number = 1; sy <= this.SYSTEMS; sy++) {
            await this.extractData(scanGalaxies[g], se, sy);
            this._navigationMatrixSystemLoadEmitter.emit(++executed);
          }
        }
      }

      if (scanGalaxies[g] > 1 && scanGalaxies[g] < 14) {
        for (let se: number = 1; se <= this.INNER_SECTORS; se++) {
          for (let sy: number = 1; sy <= this.SYSTEMS; sy++) {
            await this.extractData(scanGalaxies[g], se, sy);
            this._navigationMatrixSystemLoadEmitter.emit(++executed);
          }
        }
      }

      if (scanGalaxies[g] >= 14) {
        for (let se: number = 1; se <= this.OUTER_SECTORS; se++) {
          for (let sy: number = 1; sy <= this.SYSTEMS; sy++) {
            await this.extractData(scanGalaxies[g], se, sy);
            this._navigationMatrixSystemLoadEmitter.emit(++executed);
          }
        }
      }
    }
  }

  private allGalaxies(): number[] {
    let result: number[] = [];

    for (let i = 1; i <= this.GALAXIES; i++) {
      result.push(i);
    }

    return result
  }

  public estimatedNumberOfCalls(galaxies: number[]): number {
    let result: number = 0;
    let scanGalaxies: number[] = this.filterValidGalaxies(galaxies);

    for (let g: number = 0; g < scanGalaxies.length; g++) {
      if (scanGalaxies[g] === 1) {
        result += this.G1_SECTORS * this.SYSTEMS;
      }

      if (scanGalaxies[g] > 1 && scanGalaxies[g] < 14) {
        result += this.INNER_SECTORS * this.SYSTEMS;
      }

      if (scanGalaxies[g] >= 14) {
        result += this.OUTER_SECTORS * this.SYSTEMS;
      }
    }

    return result;
  }

  private filterValidGalaxies(galaxies: number[]): number[] {
    let scanGalaxies: number[] = [];

    if (galaxies.length === 1 && galaxies[0] === 2023) {
      scanGalaxies.push(...this.allGalaxies());
    } else {
      for (let g: number = 0; g < galaxies.length; g++) {
        if (galaxies[g] > 0 && galaxies[g] <= this.GALAXIES) {
          scanGalaxies.push(galaxies[g]);
        }
      }
    }

    return scanGalaxies;
  }

  private async extractData(galaxy: number, sector: number, system: number): Promise<void> {
    const delayMs: number = 2500 + Math.floor(Math.random() * 2500);

    console.log("Extracting system " + galaxy + '.' + sector + '.' + system + ' after ' + delayMs + 'ms');

    await this.delay(delayMs);

    let source: string = await firstValueFrom(this.httpClient.get(this.NAVIGATION_BASE_URL + galaxy + '/' + sector + '/' + system, {responseType: 'text'}));

    let dp: DOMParser = new DOMParser();
    let dd: Document = dp.parseFromString(source, 'text/html');
    dd.querySelectorAll('.navigation .planets').forEach((planet: any): void => {
      let coords = planet.querySelector('.coords span').textContent.trim();
      this.navigationMatrixPlanetLoadEmitter.emit(coords);

      let display: string = coords + ' - ';

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

  get navigationMatrixSystemLoadEmitter(): EventEmitter<number> {
    return this._navigationMatrixSystemLoadEmitter;
  }


  get navigationMatrixPlanetLoadEmitter(): EventEmitter<string> {
    return this._navigationMatrixPlanetLoadEmitter;
  }
}
