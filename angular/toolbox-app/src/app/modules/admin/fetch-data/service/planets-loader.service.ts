import {EventEmitter, inject, Injectable, Optional} from '@angular/core';
import {firstValueFrom, Subscription} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {collection, collectionData, doc, docData, Firestore, query, setDoc, updateDoc} from "@angular/fire/firestore";
import {PlanetStats} from "../../../../shared/model/stats/planet-stats.model";
import {DarkgalaxyApiService} from "../../../darkgalaxy-ui-parser/service/darkgalaxy-api.service";
import {PlayerPlanets} from "../../../../shared/model/stats/player-planets-stats.model";
import {DocumentData} from "@angular/fire/compat/firestore";
import {PlanetsBatch} from "../../../../shared/model/stats/planets-batch.model";
import {PageAction} from "../../../../shared/model/stats/page-action.model";
import {MetadataService} from "../../../local-storage/local-storage-synchronizer/service/metadata.service";
import {LocalStorageKeys} from "../../../../shared/model/local-storage/local-storage-keys";
import {LocalStorageService} from "../../../local-storage/local-storage-manager/service/local-storage.service";
import {AlliancePlanets} from "../../../../shared/model/stats/alliance-planets-stats.model";
import {PlanetScan} from "../../../../shared/model/scans/planet-scan.model";


@Injectable({
  providedIn: 'root'
})
export class PlanetsLoaderService {
  private readonly GALAXIES: number = 49;
  private readonly G1_SECTORS: number = 25;
  private readonly G2_G13_SECTORS: number = 6;
  private readonly G14_G49_SECTORS: number = 2;
  private readonly SYSTEMS: number = 4;

  private httpClient: HttpClient = inject(HttpClient);
  private firestore: Firestore = inject(Firestore);
  private dgAPI: DarkgalaxyApiService = inject(DarkgalaxyApiService);
  private metadataService: MetadataService = inject(MetadataService);
  private localStorageService: LocalStorageService = inject(LocalStorageService);

  private _systemScanEmitter: EventEmitter<PageAction> = new EventEmitter<PageAction>();
  private _planetScanEmitter: EventEmitter<string> = new EventEmitter<string>();

  private readonly NAVIGATION_BASE_URL: string = this.localStorageService.get(LocalStorageKeys.GAME_ENDPOINT) + '/navigation/';

  async scanPlanets(cancelScanEmitter: EventEmitter<boolean>, @Optional() galaxies: number[] = []): Promise<void> {
    const scanDelay: number = 250 + Math.floor(Math.random() * 250);
    const validGalaxies: number[] = this.filterValidGalaxies(galaxies);

    let scannedSystems: number = 0;
    let isScanActive: boolean = true;

    let cancelSubscription: Subscription = cancelScanEmitter.subscribe((value: boolean): void => {
      isScanActive = !value;
    });

    const totalSystemNr: number = this.totalSystemsNr(galaxies);

    for (let g: number = 0; g < validGalaxies.length; g++) {
      let playerPlanets: Map<number, PlayerPlanets> = new Map<number, PlayerPlanets>();
      let alliancePlanets: Map<string, AlliancePlanets> = new Map<string, AlliancePlanets>();
      const planetsPath: any = collection(this.firestore, 'planets-g' + validGalaxies[g]);

      let sectors: number;
      if (validGalaxies[g] === 1) {
        sectors = this.G1_SECTORS;
      } else if (validGalaxies[g] > 1 && validGalaxies[g] < 14) {
        sectors = this.G2_G13_SECTORS;
      } else {
        sectors = this.G14_G49_SECTORS;
      }

      for (let se: number = 1; se <= sectors; se++) {
        for (let sy: number = 1; sy <= this.SYSTEMS; sy++) {
          if (isScanActive) {
            await this.parseAndSave(validGalaxies[g], se, sy, playerPlanets, alliancePlanets, planetsPath);
            this._systemScanEmitter.emit(new PageAction(++scannedSystems, totalSystemNr, 'load-save'));
            await this.delay(scanDelay);
          }
        }
      }

      // -- FIXME: extract dbscans here

      this.mergePlayerPlanets(playerPlanets);
      this.mergeAlliancePlanets(alliancePlanets);
      await this.delay(scanDelay);
    }
    this.metadataService.updateMetadataTurns('planets-turn');

    cancelSubscription.unsubscribe();

    await this.delay(3000);
  }

  private mergeAlliancePlanets(alliancePlanets: Map<string, AlliancePlanets>): void {
    const alliancePlanetsPath: any = collection(this.firestore, 'alliances-planets');

    alliancePlanets.forEach((alliance: AlliancePlanets, allianceTag: string): void => {

      alliance.planets.forEach((batch: PlanetsBatch): void => {
        const scansPath: any = collection(this.firestore, 'scans-g' + batch.galaxy);
        batch.planets.forEach((planet: string): void => {

          let scanSubscription: Subscription = docData(
            doc(scansPath, planet)
          ).subscribe((item: DocumentData): void => {
            if (item) {
              let dbScan: PlanetScan = Object.assign(new PlanetScan(), item);

              batch.metalProduction += dbScan.resources[0].production;
              batch.mineralProduction += dbScan.resources[1].production;
              batch.foodProduction += dbScan.resources[2].production;
              batch.requiredSoldiers += Math.ceil(((dbScan.workers.currentNumber / 15) + (dbScan.soldiers * 1.5))) + 1;
            }

            scanSubscription.unsubscribe();
          });
        });
      });

      let subscription: Subscription = docData(
        doc(alliancePlanetsPath, allianceTag)
      ).subscribe((item: DocumentData): void => {
        if (item) {
          let dbPlanets: AlliancePlanets = Object.assign(new AlliancePlanets(), item);

          // -- if alliance has no planets in db for a particular galaxy, add all planets for that galaxy
          // -- merge all planets from DB, without the ones from the current galaxy
          dbPlanets.planets.forEach((batch: PlanetsBatch): void => {
            let hasGalaxy: boolean = alliance.planets.some((planetsBatch: PlanetsBatch): boolean => planetsBatch.galaxy === batch.galaxy);

            if (!hasGalaxy) {
              alliance.planets.push(batch);
            }
          });

          alliance.total = 0;
          alliance.planets.forEach((batch: PlanetsBatch): void => {
            alliance.total += batch.total;
            alliance.totalMetalProduction += batch.metalProduction
            alliance.totalMineralProduction += batch.mineralProduction;
            alliance.totalFoodProduction += batch.foodProduction;
            alliance.totalRequiredSoldiers += batch.requiredSoldiers;
          });

          updateDoc(doc(alliancePlanetsPath, alliance.tag), JSON.parse(JSON.stringify(alliance)))
            .catch((error): void => console.log(error));
        } else {
          alliance.total = 0;
          alliance.planets.forEach((batch: PlanetsBatch): void => {
            alliance.total += batch.total;
            alliance.totalMetalProduction += batch.metalProduction
            alliance.totalMineralProduction += batch.mineralProduction;
            alliance.totalFoodProduction += batch.foodProduction;
            alliance.totalRequiredSoldiers += batch.requiredSoldiers;
          });

          setDoc(doc(alliancePlanetsPath, alliance.tag), JSON.parse(JSON.stringify(alliance)))
            .catch((error): void => console.log(error));
        }

        subscription.unsubscribe();
      });
    });
  }

  private mergePlayerPlanets(playerPlanets: Map<number, PlayerPlanets>): void {
    const playersPlanetsPath: any = collection(this.firestore, 'players-planets');
    let maxMetal: number = 0;
    let maxMineral: number = 0;
    let maxFood: number = 0;
    let maxMetalMineral: number = 0;
    let maxAll: number = 0;
    let maxMetalLocation: string = '';
    let maxMineralLocation: string = '';
    let maxFoodLocation: string = '';
    let maxMetalMineralLocation: string = '';
    let maxAllLocation: string = '';

    playerPlanets.forEach((player: PlayerPlanets, playerId: number): void => {
      player.planets.forEach((batch: PlanetsBatch): void => {
        const scansPath: any = collection(this.firestore, 'scans-g' + batch.galaxy);
        batch.planets.forEach((planet: string): void => {

          let scanSubscription: Subscription = docData(
            doc(scansPath, planet)
          ).subscribe((item: DocumentData): void => {
            if (item) {
              let dbScan: PlanetScan = Object.assign(new PlanetScan(), item);

              batch.metalProduction += dbScan.resources[0].production;
              batch.mineralProduction += dbScan.resources[1].production;
              batch.foodProduction += dbScan.resources[2].production;
              batch.requiredSoldiers += Math.ceil(((dbScan.workers.currentNumber / 15) + (dbScan.soldiers * 1.5))) + 1;

              if (maxMetal < dbScan.resources[0].production) {
                maxMetal = dbScan.resources[0].production;
                maxMetalLocation = dbScan.location;
              }

              console.log(maxMetal);

              if (maxMineral < dbScan.resources[1].production) {
                maxMineral = dbScan.resources[1].production;
                maxMineralLocation = dbScan.location;
              }

              if (maxFood < dbScan.resources[2].production) {
                maxFood = dbScan.resources[2].production;
                maxFoodLocation = dbScan.location;
              }

              if (maxMetalMineral < (dbScan.resources[0].production + dbScan.resources[1].production * 1.5)) {
                maxMetalMineral = dbScan.resources[0].production + dbScan.resources[1].production * 5;
                maxMetalMineralLocation = dbScan.location;
              }

              if (maxAll < (dbScan.resources[0].production + (dbScan.resources[1].production * 1.5) + dbScan.resources[2].production)) {
                maxAll = dbScan.resources[0].production + (dbScan.resources[1].production * 1.5) + dbScan.resources[2].production;
                maxAllLocation = dbScan.location;
              }
            }
            scanSubscription.unsubscribe();
          });
        });
      });

      let subscription: Subscription = docData(
        doc(playersPlanetsPath, playerId.toString())
      ).subscribe((item: DocumentData): void => {
        if (item) {
          let dbPlanets: PlayerPlanets = Object.assign(new PlayerPlanets(), item);

          // -- if player has no planets in db for a particular galaxy, add all planets for that galaxy
          // -- merge all planets from DB, without the ones from the current galaxy
          dbPlanets.planets.forEach((batch: PlanetsBatch): void => {
            let hasGalaxy: boolean = player.planets.some((planetsBatch: PlanetsBatch): boolean => planetsBatch.galaxy === batch.galaxy);

            if (!hasGalaxy) {
              player.planets.push(batch);
            }
          });
        }

        player.planets.forEach((batch: PlanetsBatch): void => {
          if (batch.galaxy === 1) {
            player.g1Total += batch.planets.length;
          } else if (batch.galaxy > 1 && batch.galaxy < 14) {
            player.g213Total += batch.planets.length;
          } else {
            player.g1449Total += batch.planets.length;
          }

          player.totalMetalProduction += batch.metalProduction
          player.totalMineralProduction += batch.mineralProduction;
          player.totalFoodProduction += batch.foodProduction;
          player.totalRequiredSoldiers += batch.requiredSoldiers;

          player.total += batch.planets.length;
        });

        if (item) {
          updateDoc(doc(playersPlanetsPath, playerId.toString()), JSON.parse(JSON.stringify(player)))
            .catch((error): void => console.log(error));
        } else {
          setDoc(doc(playersPlanetsPath, player.playerId.toString()), JSON.parse(JSON.stringify(player)))
            .catch((error): void => console.log(error));
        }

        subscription.unsubscribe();
      });
    });

    console.log("Best Metal planet: " + maxMetalLocation + " - " + maxMetal);
    console.log("Best Mineral planet: " + maxMineralLocation + " - " + maxMineral);
    console.log("Best Food planet: " + maxFoodLocation + " - " + maxFood);
    console.log("Best Metal + Mineral planet score: " + maxMetalMineralLocation + " - " + maxMetalMineral);
    console.log("Best All planet score: " + maxAllLocation + " - " + maxAll);
  }

  private async parseAndSave(galaxy: number,
                             sector: number,
                             system: number,
                             playerPlanets: Map<number, PlayerPlanets>,
                             alliancePlanets: Map<string, AlliancePlanets>,
                             planetsPath: any): Promise<void> {
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

        if (stats.playerId >= 0) {
          if (!playerPlanets.has(stats.playerId)) {
            playerPlanets.set(stats.playerId, new PlayerPlanets());
          }

          let batch: PlanetsBatch[] = playerPlanets.get(stats.playerId).planets;
          let hasGalaxy: boolean = batch.some((planetsBatch: PlanetsBatch): boolean => planetsBatch.galaxy === galaxy);
          if (!hasGalaxy) {
            playerPlanets.get(stats.playerId).planets.push(new PlanetsBatch(galaxy, [stats.location], 1));
          } else {
            let filteredPlanetStats: PlanetsBatch[] =
              batch.filter((planetStats: PlanetsBatch) => planetStats.galaxy === galaxy && !planetStats.planets.includes(stats.location));
            filteredPlanetStats.forEach((planetStats: PlanetsBatch): void => {
              planetStats.planets.push(stats.location);
              planetStats.total++;
            });
          }

          playerPlanets.get(stats.playerId).name = stats.owner;
          playerPlanets.get(stats.playerId).playerId = stats.playerId;
          playerPlanets.get(stats.playerId).turn = stats.turn;

          if (stats.alliance !== '-') {
            if (!alliancePlanets.has(stats.alliance)) {
              alliancePlanets.set(stats.alliance, new AlliancePlanets());
            }

            let batch: PlanetsBatch[] = alliancePlanets.get(stats.alliance).planets;
            let hasGalaxy: boolean = batch.some((planetsBatch: PlanetsBatch): boolean => planetsBatch.galaxy === galaxy);
            if (!hasGalaxy) {
              alliancePlanets.get(stats.alliance).planets.push(new PlanetsBatch(galaxy, [stats.location], 1));
            } else {
              let filteredPlanetStats: PlanetsBatch[] =
                batch.filter((planetStats: PlanetsBatch) => planetStats.galaxy === galaxy && !planetStats.planets.includes(stats.location));
              filteredPlanetStats.forEach((planetStats: PlanetsBatch): void => {
                planetStats.planets.push(stats.location);
                planetStats.total++;
              });
            }

            alliancePlanets.get(stats.alliance).tag = stats.alliance;
            alliancePlanets.get(stats.alliance).turn = stats.turn;
          }

          setDoc(doc(planetsPath, stats.location), JSON.parse(JSON.stringify(stats)))
            .catch((error): void => console.log(error));

        }
      }, 25 * index);
    });

  }

  private filterValidGalaxies(galaxies: number[]): number[] {
    let scanGalaxies: number[] = [];

    if (galaxies.length === 1) {
      switch (galaxies[0]) {
        case 149:
          scanGalaxies.push(...this.allGalaxies());
          break;
        case 213:
          scanGalaxies.push(...Array.from({length: 12}, (_, i: number) => i + 2));
          break;
        case 1449:
          scanGalaxies.push(...Array.from({length: 36}, (_, i: number) => i + 14));
          break;
        default:
          if (galaxies[0] > 0 && galaxies[0] <= this.GALAXIES) {
            scanGalaxies.push(galaxies[0]);
          }
      }
    } else {
      scanGalaxies.push(...galaxies.filter((g: number) => g > 0 && g <= this.GALAXIES));
    }

    return scanGalaxies;
  }

  private totalSystemsNr(galaxies: number[]): number {
    const scanGalaxies: number[] = this.filterValidGalaxies(galaxies);

    return scanGalaxies.reduce((result: number, galaxy: number): number => {
      if (galaxy === 1) {
        return result + this.G1_SECTORS * this.SYSTEMS;
      } else if (galaxy > 1 && galaxy < 14) {
        return result + this.G2_G13_SECTORS * this.SYSTEMS;
      } else {
        return result + this.G14_G49_SECTORS * this.SYSTEMS;
      }
    }, 0);
  }

  private allGalaxies(): number[] {
    return Array.from({length: this.GALAXIES}, (_, i: number) => i + 1);
  }

  private delay = async (ms: number): Promise<unknown> => new Promise(res => setTimeout(res, ms));

  get systemScanEmitter(): EventEmitter<PageAction> {
    return this._systemScanEmitter;
  }


  get planetScanEmitter(): EventEmitter<string> {
    return this._planetScanEmitter;
  }

}
