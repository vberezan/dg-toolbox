import {EventEmitter, inject, Injectable, Optional} from '@angular/core';
import {firstValueFrom, Subscription} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {collection, doc, docData, Firestore, setDoc, updateDoc} from "@angular/fire/firestore";
import {PlanetStats} from "../../../../shared/model/stats/planet-stats.model";
import {DarkgalaxyApiService} from "../../../darkgalaxy-ui-parser/service/darkgalaxy-api.service";
import {PlayerPlanetsStats} from "../../../../shared/model/stats/player-planets-stats.model";
import {DocumentData} from "@angular/fire/compat/firestore";
import {PlayerPlanetsBatch} from "../../../../shared/model/stats/player-planets-batch.model";
import {PageAction} from "../../../../shared/model/stats/page-action.model";

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

  private _systemScanEmitter: EventEmitter<PageAction> = new EventEmitter<PageAction>();
  private _planetScanEmitter: EventEmitter<string> = new EventEmitter<string>();

  async scanNavigationScreen(cancelScanEmitter: EventEmitter<boolean>, @Optional() galaxies: number[] = []): Promise<void> {
    const scanDelay: number = 500 + Math.floor(Math.random() * 1000);
    const validGalaxies: number[] = this.filterValidGalaxies(galaxies);

    let scannedSystems: number = 0;
    let isScanActive: boolean = true;

    let cancelSubscription: Subscription = cancelScanEmitter.subscribe((value: boolean): void => {
      isScanActive = !value;
    });

    const totalSystemNr: number = this.totalSystemsNr(galaxies);

    for (let g: number = 0; g < validGalaxies.length; g++) {
      let playerPlanets: Map<number, PlayerPlanetsStats> = new Map<number, PlayerPlanetsStats>();
      const collectionPath: any = collection(this.firestore, 'planets-g' + validGalaxies[g]);

      if (validGalaxies[g] === 1) {
        for (let se: number = 1; se <= this.G1_SECTORS; se++) {
          for (let sy: number = 1; sy <= this.SYSTEMS; sy++) {
            if (isScanActive) {
              await this.parseAndSave(validGalaxies[g], se, sy, playerPlanets, collectionPath);
              this._systemScanEmitter.emit(new PageAction(++scannedSystems, totalSystemNr, 'load-save'));
              await this.delay(scanDelay);
            }
          }
        }
      }

      if (validGalaxies[g] > 1 && validGalaxies[g] < 14) {
        for (let se: number = 1; se <= this.INNER_SECTORS; se++) {
          for (let sy: number = 1; sy <= this.SYSTEMS; sy++) {
            if (isScanActive) {
              await this.parseAndSave(validGalaxies[g], se, sy, playerPlanets, collectionPath);
              this._systemScanEmitter.emit(new PageAction(++scannedSystems, totalSystemNr, 'load-save'));
              await this.delay(scanDelay);
            }
          }
        }
      }

      if (validGalaxies[g] >= 14) {
        for (let se: number = 1; se <= this.OUTER_SECTORS; se++) {
          for (let sy: number = 1; sy <= this.SYSTEMS; sy++) {
            if (isScanActive) {
              await this.parseAndSave(validGalaxies[g], se, sy, playerPlanets, collectionPath);
              this._systemScanEmitter.emit(new PageAction(++scannedSystems, totalSystemNr, 'load-save'));
              await this.delay(scanDelay);
            }
          }
        }
      }

      this.savePlayerPlanets(playerPlanets);
    }

    cancelSubscription.unsubscribe();
  }

  private savePlayerPlanets(playerPlanets: Map<number, PlayerPlanetsStats>): void {
    const collectionPath: any = collection(this.firestore, 'players-planets');

    playerPlanets.forEach((player: PlayerPlanetsStats, playerId: number): void => {
      let subscription: Subscription = docData(
        doc(collectionPath, playerId.toString())
      ).subscribe((item: DocumentData): void => {
        if (item) {
          let playerPlanetStats: PlayerPlanetsStats = Object.assign(new PlayerPlanetsStats(), item);

          playerPlanetStats.planets.forEach((batch: PlayerPlanetsBatch): void => {
            let hasGalaxy: boolean = player.planets.some((planetsBatch: PlayerPlanetsBatch): boolean => planetsBatch.galaxy === batch.galaxy);

            if (!hasGalaxy) {
              player.planets.push(batch);
            }
          })

          let totalPlanets: number = 0;
          player.planets.forEach((batch: PlayerPlanetsBatch): void => {
            totalPlanets += batch.planets.length;
          });
          player.total = totalPlanets + 1;

          updateDoc(doc(collectionPath, playerId.toString()), JSON.parse(JSON.stringify(player)))
            .catch((error): void => console.log(error));
        } else {
          let totalPlanets: number = 0;
          player.planets.forEach((batch: PlayerPlanetsBatch): void => {
            totalPlanets += batch.planets.length;
          });
          player.total = totalPlanets;

          setDoc(doc(collectionPath, player.playerId.toString()), JSON.parse(JSON.stringify(player)))
            .catch((error): void => console.log(error));
        }

        subscription.unsubscribe();
      });
    });
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

  private async parseAndSave(galaxy: number, sector: number, system: number, playerPlanets: Map<number, PlayerPlanetsStats>, collectionPath: any): Promise<void> {
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

        if (stats.playerId >= 0) {
          stats.turn = this.dgAPI.gameTurn();

          if (!playerPlanets.has(stats.playerId)) {
            playerPlanets.set(stats.playerId, new PlayerPlanetsStats());
          }

          let batch: PlayerPlanetsBatch[] = playerPlanets.get(stats.playerId).planets;
          let hasGalaxy: boolean = batch.some((planetsBatch: PlayerPlanetsBatch): boolean => planetsBatch.galaxy === galaxy);
          if (!hasGalaxy) {
            playerPlanets.get(stats.playerId).planets.push(new PlayerPlanetsBatch(galaxy, [stats.location]));
          } else {
            let filteredPlanetStats: PlayerPlanetsBatch[] =
              batch.filter((planetStats: PlayerPlanetsBatch) => planetStats.galaxy === galaxy && !planetStats.planets.includes(stats.location));
            filteredPlanetStats.forEach((planetStats: PlayerPlanetsBatch) => planetStats.planets.push(stats.location));
          }

          playerPlanets.get(stats.playerId).name = stats.owner;
          playerPlanets.get(stats.playerId).playerId = stats.playerId;
          playerPlanets.get(stats.playerId).turn = this.dgAPI.gameTurn();

          setDoc(doc(collectionPath, stats.location), JSON.parse(JSON.stringify(stats)))
            .catch((error): void => console.log(error));
        }
      }, 50 * index);
    });

  }

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

  private delay = async (ms: number): Promise<unknown> => new Promise(res => setTimeout(res, ms));

  get systemScanEmitter(): EventEmitter<PageAction> {
    return this._systemScanEmitter;
  }


  get planetScanEmitter(): EventEmitter<string> {
    return this._planetScanEmitter;
  }

}
