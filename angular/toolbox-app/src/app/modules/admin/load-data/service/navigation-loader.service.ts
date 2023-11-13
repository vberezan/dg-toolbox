import {EventEmitter, inject, Injectable, Optional} from '@angular/core';
import {firstValueFrom, Subscription} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {collection, doc, Firestore, setDoc} from "@angular/fire/firestore";
import {PlanetStats} from "../../../../shared/model/stats/planet-stats.model";
import {DarkgalaxyApiService} from "../../../darkgalaxy-ui-parser/service/darkgalaxy-api.service";

@Injectable({
  providedIn: 'root'
})
export class NavigationLoaderService {
  private readonly NAVIGATION_BASE_URL: string = 'https://andromeda.darkgalaxy.com/navigation/';
  private readonly GALAXIES: number = 49;
  private readonly G1_SECTORS: number = 25;
  private readonly INNER_SECTORS: number = 6;
  private readonly OUTER_SECTORS: number = 2;
  private readonly SYSTEMS: number = 4;

  private httpClient: HttpClient = inject(HttpClient);
  private firestore: Firestore = inject(Firestore);
  private dgAPI: DarkgalaxyApiService = inject(DarkgalaxyApiService);

  private _systemScanEmitter: EventEmitter<{'total':number, 'system': number}> = new EventEmitter<{'total':number, 'system': number}>();
  private _planetScanEmitter: EventEmitter<string> = new EventEmitter<string>();

  async scanNavigationScreen(cancelScanEmitter: EventEmitter<boolean>, @Optional() galaxies: number[] = []): Promise<void> {
    const scanDelay: number = 1500 + Math.floor(Math.random() * 1500);
    const planetsRef: any = collection(this.firestore, 'planets');
    const validGalaxies: number[] = this.filterValidGalaxies(galaxies);

    let scannedSystems: number = 0;
    let isScanActive: boolean = true;

    let cancelSubscription: Subscription = cancelScanEmitter.subscribe((value: boolean): void => {
      isScanActive = !value;
    });

    const totalSystemNr = this.totalSystemsNr(galaxies);

    for (let g: number = 0; g < validGalaxies.length; g++) {
      if (validGalaxies[g] === 1) {
        for (let se: number = 1; se <= this.G1_SECTORS; se++) {
          for (let sy: number = 1; sy <= this.SYSTEMS; sy++) {
            if (isScanActive) {
              await this.parseAndSave(validGalaxies[g], se, sy, planetsRef);
              this._systemScanEmitter.emit({'system': ++scannedSystems, 'total': totalSystemNr});
              await this.delay(scanDelay);
            }
          }
        }
      }

      if (validGalaxies[g] > 1 && validGalaxies[g] < 14) {
        for (let se: number = 1; se <= this.INNER_SECTORS; se++) {
          for (let sy: number = 1; sy <= this.SYSTEMS; sy++) {
            if (isScanActive) {
              await this.parseAndSave(validGalaxies[g], se, sy, planetsRef);
              this._systemScanEmitter.emit({'system': ++scannedSystems, 'total': totalSystemNr});
              await this.delay(scanDelay);
            }
          }
        }
      }

      if (validGalaxies[g] >= 14) {
        for (let se: number = 1; se <= this.OUTER_SECTORS; se++) {
          for (let sy: number = 1; sy <= this.SYSTEMS; sy++) {
            if (isScanActive) {
              await this.parseAndSave(validGalaxies[g], se, sy, planetsRef);
              this._systemScanEmitter.emit({'system': ++scannedSystems, 'total': totalSystemNr});
              await this.delay(scanDelay);
            }
          }
        }
      }
    }

    cancelSubscription.unsubscribe();
  }

  totalSystemsNr(galaxies: number[]): number {
    let result: number = 0;
    const scanGalaxies: number[] = this.filterValidGalaxies(galaxies);

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

  private async parseAndSave(galaxy: number, sector: number, system: number, planetsRef: any): Promise<void> {
    const source: string = await firstValueFrom(this.httpClient.get(this.NAVIGATION_BASE_URL + galaxy + '/' + sector + '/' + system, {responseType: 'text'}));
    const dom: Document = new DOMParser().parseFromString(source, 'text/html');

    dom.querySelectorAll('.navigation .planets').forEach((planet: any, index: number): void => {
      setTimeout((): void => {
        let stats: PlanetStats = new PlanetStats();

        const coords = planet.querySelector('.coords span').textContent.trim();
        const splitCoords = coords.split(/\./);
        this.planetScanEmitter.emit(coords);

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
          } else {
            stats.alliance = '-';
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

    if (galaxies.length === 1 && galaxies[0] === 149) {
      scanGalaxies.push(...this.allGalaxies());
    } else if (galaxies.length === 1 && galaxies[0] === 213) {
      for (let g: number = 2; g <= 13; g++) {
        scanGalaxies.push(g);
      }
    } else if (galaxies.length === 1 && galaxies[0] === 1449) {
      for (let g: number = 14; g <= 49; g++) {
        scanGalaxies.push(g);
      }
    } else {
      for (let g: number = 0; g < galaxies.length; g++) {
        if (galaxies[g] > 0 && galaxies[g] <= this.GALAXIES) {
          scanGalaxies.push(galaxies[g]);
        }
      }
    }

    return scanGalaxies;
  }

  get systemScanEmitter(): EventEmitter<{'total':number, 'system': number}> {
    return this._systemScanEmitter;
  }


  get planetScanEmitter(): EventEmitter<string> {
    return this._planetScanEmitter;
  }

}