import {EventEmitter, inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {collection, doc, docData, Firestore} from "@angular/fire/firestore";
import {firstValueFrom, Subscription} from "rxjs";
import {PlayerStats} from "../../../../shared/model/stats/player-stats.model";
import {DocumentData} from "@angular/fire/compat/firestore";
import {PlayerPlanets} from "../../../../shared/model/stats/player-planets-stats.model";
import {PageAction} from "../../../../shared/model/stats/page-action.model";
import {AtomicNumber} from "../../../../shared/model/atomic-number.model";
import {LocalStorageKeys} from "../../../../shared/model/local-storage/local-storage-keys";
import {LocalStorageService} from "../../../local-storage/local-storage-manager/service/local-storage.service";
import {Metadata} from "../../../../shared/model/local-storage/metadata.model";
import {DarkgalaxyApiService} from "../../../darkgalaxy-ui-parser/service/darkgalaxy-api.service";
import {UpdateMetadata} from "../../../../shared/model/stats/update-metadata.model";

@Injectable({
  providedIn: 'root'
})
export class PlayersRankingsLoaderService {
  private httpClient: HttpClient = inject(HttpClient);
  private firestore: Firestore = inject(Firestore);
  private localStorageService: LocalStorageService = inject(LocalStorageService);
  private dgAPI: DarkgalaxyApiService = inject(DarkgalaxyApiService);

  private readonly PLAYER_RANKINGS_URL: string = this.localStorageService.get(LocalStorageKeys.GAME_ENDPOINT) + '/rankings/players/';
  private readonly PLAYER_COMBAT_RANKINGS_URL: string = this.localStorageService.get(LocalStorageKeys.GAME_ENDPOINT) + '/rankings/combat/players/';

  async scanPlayersRankingsScreens(playersRankingsEmitter: EventEmitter<PageAction>): Promise<void> {
    const scanDelay: number = 100 + Math.floor(Math.random() * 100);
    const playersPlanetsPath: any = collection(this.firestore, 'players-planets');


    let scanned: AtomicNumber = new AtomicNumber(0);
    let playersStats: Map<number, PlayerStats> = new Map<number, PlayerStats>();
    let pages: number = await this.getNumberOfPages();

    for (let page: number = 1; page <= pages; page++) {
      await this.scanRankingsPage(playersStats, playersRankingsEmitter, scanned, scanDelay, page, pages);
      await this.scanCombatRankingsPage(playersStats, playersRankingsEmitter, scanned, scanDelay, page, pages);
    }

    await this.cacheRankings(playersStats, playersPlanetsPath, playersRankingsEmitter, new AtomicNumber(0));
  }

  private async getNumberOfPages(): Promise<number> {
    let source: string = await firstValueFrom(this.httpClient.get(this.PLAYER_RANKINGS_URL, {responseType: 'text'}));
    let dom: Document = new DOMParser().parseFromString(source, 'text/html');
    return parseInt(dom.querySelector('.right.lightBorder.opacDarkBackground.padding').textContent.trim().split('of')[dom.querySelector('.right.lightBorder.opacDarkBackground.padding').textContent.trim().split('of').length - 1].trim());
  }

  private async scanRankingsPage(playersStats: Map<number, PlayerStats>,
                                 playersRankingsEmitter: EventEmitter<PageAction>,
                                 scanned: AtomicNumber,
                                 scanDelay: number,
                                 page: number,
                                 pages: number): Promise<void> {
    let source: string = await firstValueFrom(this.httpClient.get(this.PLAYER_RANKINGS_URL + page, {responseType: 'text'}));
    let dom: Document = new DOMParser().parseFromString(source, 'text/html');

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

      if (row.classList.contains('myRow')) {
        player.relation = 'allied';
      } else if (row.querySelector('.hostile')) {
        player.relation = 'neutral';
      } else if (row.querySelector('.allied')) {
        player.relation = 'allied';
      }

      if (player.alliance === 'sol') {
        player.relation = 'nap';
      }

      if (player.alliance === 'wp' || player.alliance === 'skol') {
        player.relation = 'hostile';
      }

    });

    scanned.number += await this.atomicIncrement();
    playersRankingsEmitter.emit(new PageAction(scanned.number, 2 * pages, 'load'));
    await this.delay(scanDelay);
  }

  private async scanCombatRankingsPage(playersStats: Map<number, PlayerStats>,
                                       playersRankingsEmitter: EventEmitter<PageAction>,
                                       scanned: AtomicNumber,
                                       scanDelay: number,
                                       page: number,
                                       pages: number): Promise<void> {
    let source: string = await firstValueFrom(this.httpClient.get(this.PLAYER_COMBAT_RANKINGS_URL + page, {responseType: 'text'}));
    let dom: Document = new DOMParser().parseFromString(source, 'text/html');

    dom.querySelectorAll('.rankingsList .entry').forEach((row: any): void => {
      const playerId: number = parseInt(row.querySelector('.playerName').attributes['playerId'].value.trim());

      if (!playersStats.has(playerId)) {
        playersStats.set(playerId, new PlayerStats());
      }

      let player: PlayerStats = playersStats.get(playerId);

      player.combatScore = parseInt(row.querySelector('.score').textContent.trim().replace(/,/g, ''));
      player.combinedScore = player.combatScore + player.score;
    });

    scanned.number += await this.atomicIncrement();
    playersRankingsEmitter.emit(new PageAction(scanned.number, 2 * pages, 'load'));
    await this.delay(scanDelay);
  }

  private async cacheRankings(playersStats: Map<number, PlayerStats>,
                              playersPlanetsPath: any,
                              playersRankingsEmitter: EventEmitter<PageAction>,
                              saved: AtomicNumber): Promise<void> {
    let cache: PlayerStats[] = [];

    let delay: number = 0;
    playersStats.forEach((playerStats: PlayerStats, playerId: number): void => {
      setTimeout((): void => {
        let subscription: Subscription = docData(
          doc(playersPlanetsPath, playerId.toString())
        ).subscribe((item: DocumentData): void => {
          if (item) {
            const playerPlanets: PlayerPlanets = Object.assign(new PlayerPlanets(), item);

            playerStats.planets = playerPlanets.total;
            playerStats.g1Total = playerPlanets.g1Total;
            playerStats.g213Total = playerPlanets.g213Total;
            playerStats.g1449Total = playerPlanets.g1449Total;
          } else {
            playerStats.planets = 1;
          }

          cache.push(playerStats);
          playersRankingsEmitter.emit(new PageAction(++saved.number, playersStats.size, 'save'));

          subscription.unsubscribe();
        });
      }, ++delay * 50);
    });

    await this.delay(50 * ++delay).then((): void => {
      this.localStorageService.cache(LocalStorageKeys.PLAYERS_STATS, cache);
      let localMetadata: Metadata = this.localStorageService.localMetadata();
      localMetadata.playersRankingsTurn = new UpdateMetadata(this.dgAPI.gameTurn(), 0);
      this.localStorageService.cache(LocalStorageKeys.LOCAL_METADATA, localMetadata);

      console.log("done");
    });
  }

  private delay = async (ms: number): Promise<unknown> => new Promise(res => setTimeout(res, ms));

  private async atomicIncrement(): Promise<number> {
    return 1;
  }
}
