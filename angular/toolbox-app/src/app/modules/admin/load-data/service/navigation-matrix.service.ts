import {EventEmitter, inject, Injectable, Optional} from '@angular/core';
import {firstValueFrom, Subscription} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {collection, doc, Firestore, setDoc} from "@angular/fire/firestore";
import {PlanetStats} from "../../../../shared/model/stats/planet-stats.model";
import {DarkgalaxyApiService} from "../../../darkgalaxy-ui-parser/service/darkgalaxy-api.service";

@Injectable({
  providedIn: 'root'
})
export class NavigationMatrixService {
  private httpClient: HttpClient = inject(HttpClient);
  private firestore: Firestore = inject(Firestore);
  private dgAPI: DarkgalaxyApiService = inject(DarkgalaxyApiService);

  private readonly NAVIGATION_BASE_URL: string = 'https://andromeda.darkgalaxy.com/navigation/';
  private readonly GALAXIES: number = 49;
  private readonly G1_SECTORS: number = 25;
  private readonly INNER_SECTORS: number = 6;
  private readonly OUTER_SECTORS: number = 2;
  private readonly SYSTEMS: number = 4;
  private _navigationMatrixSystemLoadEmitter: EventEmitter<number> = new EventEmitter();
  private _navigationMatrixPlanetLoadEmitter: EventEmitter<string> = new EventEmitter();
  private planetsSubscription: Subscription;

  public async extractGalaxies(cancelEmitter: EventEmitter<boolean>, @Optional() galaxies: number[] = []): Promise<void> {
    const delayMs: number = 1500 + Math.floor(Math.random() * 1500);
    let scanGalaxies: number[] = this.filterValidGalaxies(galaxies);
    let executed: number = 0;
    let active: boolean = true;
    let planetsRef: any = collection(this.firestore, 'planets');

    cancelEmitter.subscribe((value: boolean): void => {
      active = !value;
    });

    for (let g: number = 0; g < scanGalaxies.length; g++) {

      if (scanGalaxies[g] === 1) {
        for (let se: number = 1; se <= this.G1_SECTORS; se++) {
          for (let sy: number = 1; sy <= this.SYSTEMS; sy++) {
            if (active) {
              await this.loadData(scanGalaxies[g], se, sy, planetsRef);
              this._navigationMatrixSystemLoadEmitter.emit(++executed);
              await this.delay(delayMs);
            }
          }
        }
      }

      if (scanGalaxies[g] > 1 && scanGalaxies[g] < 14) {
        for (let se: number = 1; se <= this.INNER_SECTORS; se++) {
          for (let sy: number = 1; sy <= this.SYSTEMS; sy++) {
            if (active) {
              await this.loadData(scanGalaxies[g], se, sy, planetsRef);
              this._navigationMatrixSystemLoadEmitter.emit(++executed);
              await this.delay(delayMs);
            }
          }
        }
      }

      if (scanGalaxies[g] >= 14) {
        for (let se: number = 1; se <= this.OUTER_SECTORS; se++) {
          for (let sy: number = 1; sy <= this.SYSTEMS; sy++) {
            if (active) {
              await this.loadData(scanGalaxies[g], se, sy, planetsRef);
              this._navigationMatrixSystemLoadEmitter.emit(++executed);
              await this.delay(delayMs);
            }
          }
        }
      }
    }
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

  private allGalaxies(): number[] {
    let result: number[] = [];

    for (let i = 1; i <= this.GALAXIES; i++) {
      result.push(i);
    }

    return result
  }

  private async loadData(galaxy: number, sector: number, system: number, planetsRef: any): Promise<void> {
    let source: string = await firstValueFrom(this.httpClient.get(this.NAVIGATION_BASE_URL + galaxy + '/' + sector + '/' + system, {responseType: 'text'}));

    let dp: DOMParser = new DOMParser();
    let dd: Document = dp.parseFromString(source, 'text/html');
    dd.querySelectorAll('.navigation .planets').forEach((planet: any, index: number): void => {
      setTimeout((): void => {
        let stats: PlanetStats = new PlanetStats();

        let coords = planet.querySelector('.coords span').textContent.trim();
        let splitCoords = coords.split(/\./);
        this.navigationMatrixPlanetLoadEmitter.emit(coords);

        stats.location = coords;
        stats.galaxy = parseInt(splitCoords[0]);
        stats.sector = parseInt(splitCoords[1]);
        stats.system = parseInt(splitCoords[2]);
        stats.planet = parseInt(splitCoords[3]);


        if (planet.classList.contains('neutral')) {
          stats.owner = 'none';
          stats.playerId = -1;
          stats.alliance = '-'
        } else {
          if (planet.querySelector('.allianceName')) {
            stats.alliance = planet.querySelector('.allianceName').textContent.trim().toLowerCase().replace(/\[/g, '').replace(/]/g, '');
          }

          stats.owner = planet.querySelector('.playerName').textContent.trim().toLowerCase();
          stats.playerId = parseInt(planet.querySelector('.playerName').attributes['playerId'].value.trim());
        }

        stats.turn = this.dgAPI.gameTurn();
        setDoc(doc(planetsRef, stats.location), JSON.parse(JSON.stringify(stats)))
          .catch((error): void => {
            console.log(error);
          });
      }, 100 * index);
    });

  }

  private delay = async (ms: number): Promise<unknown> => new Promise(res => setTimeout(res, ms));

  private filterValidGalaxies(galaxies: number[]): number[] {
    let scanGalaxies: number[] = [];

    if (galaxies.length === 1 && galaxies[0] === 1111) {
      scanGalaxies.push(...this.allGalaxies());
    } else if (galaxies.length === 1 && galaxies[0] === 2222) {
      scanGalaxies.push(2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
    } else if (galaxies.length === 1 && galaxies[0] === 3333) {
      scanGalaxies.push(14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49);
    } else {
      for (let g: number = 0; g < galaxies.length; g++) {
        if (galaxies[g] > 0 && galaxies[g] <= this.GALAXIES) {
          scanGalaxies.push(galaxies[g]);
        }
      }
    }

    return scanGalaxies;
  }

  get navigationMatrixSystemLoadEmitter(): EventEmitter<number> {
    return this._navigationMatrixSystemLoadEmitter;
  }


  get navigationMatrixPlanetLoadEmitter(): EventEmitter<string> {
    return this._navigationMatrixPlanetLoadEmitter;
  }

}
