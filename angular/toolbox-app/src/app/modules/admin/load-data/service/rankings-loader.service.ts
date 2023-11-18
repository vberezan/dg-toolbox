import {EventEmitter, inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {collection, collectionData, doc, docData, Firestore, limit, query, setDoc, updateDoc, where} from "@angular/fire/firestore";
import {DarkgalaxyApiService} from "../../../darkgalaxy-ui-parser/service/darkgalaxy-api.service";
import {firstValueFrom, Subscription} from "rxjs";
import {PlayerStats} from "../../../../shared/model/stats/player-stats.model";
import {DocumentData} from "@angular/fire/compat/firestore";
import {PlanetStats} from "../../../../shared/model/stats/planet-stats.model";
import {PlayerPlanetsBatch} from "../../../../shared/model/stats/player-planets-batch.model";
import {PlayerPlanetsStats} from "../../../../shared/model/stats/player-planets-stats.model";

@Injectable({
  providedIn: 'root'
})
export class RankingsLoaderService {
  private readonly PLAYER_RANKINGS_URL: string = 'https://andromeda.darkgalaxy.com/rankings/players/';
  private readonly PLAYER_COMBAT_RANKINGS_URL: string = 'https://andromeda.darkgalaxy.com/rankings/combat/players/';

  private readonly ALLIANCE_RANKINGS_URL: string = 'https://andromeda.darkgalaxy.com/navigation/';
  private readonly ALLIANCE_COMBAT_RANKINGS_URL: string = 'https://andromeda.darkgalaxy.com/rankings/combat/alliances/';

  private httpClient: HttpClient = inject(HttpClient);
  private firestore: Firestore = inject(Firestore);
  private dgAPI: DarkgalaxyApiService = inject(DarkgalaxyApiService);

  private _playersRankingsEmitter: EventEmitter<{ 'total': number, 'page': number, 'action': string }>
    = new EventEmitter<{ 'total': number, 'page': number, 'action': string }>();


  async scanPlayersRankingsScreens(cancelScanEmitter: EventEmitter<boolean>): Promise<void> {
    const scanDelay: number = 1500 + Math.floor(Math.random() * 1500);
    const playersRef: any = collection(this.firestore, 'players-rankings');
    const configRef: any = collection(this.firestore, 'config');
    const playersPlanetsPath: any = collection(this.firestore, 'players-planets');


    let isScanActive: boolean = true;

    let cancelSubscription: Subscription = cancelScanEmitter.subscribe((value: boolean): void => {
      isScanActive = !value;
    });

    let scannedRankings: number = 0;
    let playersStats: Map<number, PlayerStats> = new Map<number, PlayerStats>();
    let source: string = await firstValueFrom(this.httpClient.get(this.PLAYER_RANKINGS_URL, {responseType: 'text'}));
    let dom: Document = new DOMParser().parseFromString(source, 'text/html');
    const pages: number = parseInt(dom.querySelector('.right.lightBorder.opacDarkBackground.padding').textContent.trim().split('of')[dom.querySelector('.right.lightBorder.opacDarkBackground.padding').textContent.trim().split('of').length - 1].trim());

    for (let page: number = 1; page <= pages; page++) {
      if (isScanActive) {
        source = await firstValueFrom(this.httpClient.get(this.PLAYER_RANKINGS_URL + page, {responseType: 'text'}));
        dom = new DOMParser().parseFromString(source, 'text/html');

        dom.querySelectorAll('.rankingsList .entry').forEach((row: any): void => {
          const playerId: number = parseInt(row.querySelector('.playerName').attributes['playerId'].value.trim());

          if (!playersStats.has(playerId)) {
            playersStats.set(playerId, new PlayerStats());
          }

          let player: PlayerStats = playersStats.get(playerId);

          player.playerId = playerId;
          player.name = row.querySelector('.playerName').textContent.trim().toLowerCase();
          player.rank = parseInt(row.querySelector('.rank').textContent.trim().replace(/,/g, ''));
          player.score = parseInt(row.querySelector('.score').textContent.trim().replace(/,/g, ''));
          player.combinedScore = player.combatScore + player.score;
          if (row.querySelector('.allianceName')) {
            player.alliance = row.querySelector('.allianceName').textContent.trim().toLowerCase().replace(/\[/g, '').replace(/]/g, '');
          } else {
            player.alliance = '-';
          }
        });

        this._playersRankingsEmitter.emit({'action': 'load', 'page': ++scannedRankings, 'total': 2 * pages});
        await this.delay(scanDelay);

        source = await firstValueFrom(this.httpClient.get(this.PLAYER_COMBAT_RANKINGS_URL + page, {responseType: 'text'}));
        dom = new DOMParser().parseFromString(source, 'text/html');

        dom.querySelectorAll('.rankingsList .entry').forEach((row: any): void => {
          const playerId: number = parseInt(row.querySelector('.playerName').attributes['playerId'].value.trim());

          if (!playersStats.has(playerId)) {
            playersStats.set(playerId, new PlayerStats());
          }

          let player: PlayerStats = playersStats.get(playerId);

          player.combatScore = parseInt(row.querySelector('.score').textContent.trim().replace(/,/g, ''));
          player.combinedScore = player.combatScore + player.score;
        });

        this._playersRankingsEmitter.emit({'action': 'load', 'page': ++scannedRankings, 'total': 2 * pages});
        await this.delay(scanDelay);
      }

      cancelSubscription.unsubscribe();
    }

    let savedRankings: number = 0;
    playersStats.forEach((playerStats: PlayerStats, playerId: number): void => {
      if (isScanActive) {
        setTimeout((): void => {
          let playerPlanetsSubscription: Subscription = docData(
            doc(playersPlanetsPath, playerId.toString(), 'total', 'total')
          ).subscribe((item: DocumentData): void => {
            playerStats.planets = Object.assign(0, item);

            setDoc(doc(playersRef, playerId.toString()), JSON.parse(JSON.stringify(playerStats)))
              .then((): void => {
                this._playersRankingsEmitter.emit({'action': 'save', 'page': ++savedRankings, 'total': playersStats.size});
              }).catch((error): void => console.log(error)
            );

            playerPlanetsSubscription.unsubscribe();
          });
        }, 50 * savedRankings);
      }
    });

    await this.delay(50 * playersStats.size);

    updateDoc(doc(configRef, 'last-players-rankings-update-turn'), JSON.parse(JSON.stringify({'value': this.dgAPI.gameTurn()})))
      .catch((e): void => console.log(e));
  }

  async scanAlliancesRankingsScreens(): Promise<void> {

  }

  private delay = async (ms: number): Promise<unknown> => new Promise(res => setTimeout(res, ms));


  get playersRankingsEmitter(): EventEmitter<{ 'total': number, 'page': number, 'action': string }> {
    return this._playersRankingsEmitter;
  }
}
