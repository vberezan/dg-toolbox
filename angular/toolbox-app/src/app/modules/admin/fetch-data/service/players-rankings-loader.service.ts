import {EventEmitter, inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {collection, doc, docData, Firestore, setDoc} from "@angular/fire/firestore";
import {firstValueFrom, Subscription} from "rxjs";
import {PlayerStats} from "../../../../shared/model/stats/player-stats.model";
import {DocumentData} from "@angular/fire/compat/firestore";
import {PlayerPlanets} from "../../../../shared/model/stats/player-planets-stats.model";
import {MetadataService} from "../../../local-storage/local-storage-synchronizer/service/metadata.service";
import {PageAction} from "../../../../shared/model/stats/page-action.model";
import {AtomicNumber} from "../../../../shared/model/atomic-number.model";
import {LocalStorageKeys} from "../../../../shared/model/local-storage/local-storage-keys";
import {LocalStorageService} from "../../../local-storage/local-storage-manager/service/local-storage.service";

@Injectable({
  providedIn: 'root'
})
export class PlayersRankingsLoaderService {
  private httpClient: HttpClient = inject(HttpClient);
  private firestore: Firestore = inject(Firestore);
  private metadataService: MetadataService = inject(MetadataService);
  private localStorageService: LocalStorageService = inject(LocalStorageService);

  private _playersRankingsEmitter: EventEmitter<PageAction> = new EventEmitter<PageAction>();

  private readonly PLAYER_RANKINGS_URL: string = this.localStorageService.get(LocalStorageKeys.GAME_ENDPOINT) + '/rankings/players/';
  private readonly PLAYER_COMBAT_RANKINGS_URL: string = this.localStorageService.get(LocalStorageKeys.GAME_ENDPOINT) + '/rankings/combat/players/';

  async scanPlayersRankingsScreens(cancelScanEmitter: EventEmitter<boolean>): Promise<void> {
    const scanDelay: number = 100 + Math.floor(Math.random() * 100);
    const playersRankingsPath: any = collection(this.firestore, 'players-rankings');
    const playersPlanetsPath: any = collection(this.firestore, 'players-planets');

    let isScanActive: boolean = true;
    let cancelSubscription: Subscription = cancelScanEmitter.subscribe((value: boolean): void => {
      isScanActive = !value;
    });

    let scanned: AtomicNumber = new AtomicNumber(0);
    let playersStats: Map<number, PlayerStats> = new Map<number, PlayerStats>();
    let pages: number = await this.getNumberOfPages();

    for (let page: number = 1; page <= pages; page++) {
      if (isScanActive) {
        await this.scanRankingsPage(playersStats, scanned, scanDelay, page, pages);
        await this.scanCombatRankingsPage(playersStats, scanned, scanDelay, page, pages);
      }
      cancelSubscription.unsubscribe();
    }

    await this.saveRankings(playersStats, isScanActive, playersRankingsPath, playersPlanetsPath, new AtomicNumber(0));

    this.metadataService.updateMetadataTurns('players-rankings-turn');
  }

  private async getNumberOfPages(): Promise<number> {
    let source: string = await firstValueFrom(this.httpClient.get(this.PLAYER_RANKINGS_URL, {responseType: 'text'}));
    let dom: Document = new DOMParser().parseFromString(source, 'text/html');
    return parseInt(dom.querySelector('.right.lightBorder.opacDarkBackground.padding').textContent.trim().split('of')[dom.querySelector('.right.lightBorder.opacDarkBackground.padding').textContent.trim().split('of').length - 1].trim());
  }

  private async scanRankingsPage(playersStats: Map<number, PlayerStats>, scanned: AtomicNumber, scanDelay: number, page: number, pages: number): Promise<void> {
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
        console.log('self');
        player.relation = 'self';
      } else if (row.querySelector('hostile')) {
        console.log('hostile');
        player.relation = 'hostile';
      } else if (row.querySelector('allied')) {
        console.log('allied');
        player.relation = 'allied';
      }

      if (player.alliance === 'sol') {
        console.log('sol');
        player.relation = 'nap';
      }

    });

    scanned.number += await this.atomicIncrement();
    this._playersRankingsEmitter.emit(new PageAction(scanned.number, 2 * pages, 'load'));
    await this.delay(scanDelay);
  }

  private async scanCombatRankingsPage(playersStats: Map<number, PlayerStats>, scanned: AtomicNumber, scanDelay: number, page: number, pages: number): Promise<void> {
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
    this._playersRankingsEmitter.emit(new PageAction(scanned.number, 2 * pages, 'load'));
    await this.delay(scanDelay);
  }

  private async saveRankings(playersStats: Map<number, PlayerStats>, isScanActive: boolean, playersRankingsPath: any, playersPlanetsPath: any, saved: AtomicNumber): Promise<void> {
    playersStats.forEach((playerStats: PlayerStats, playerId: number): void => {
      if (isScanActive) {
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
            setDoc(doc(playersRankingsPath, playerId.toString()), JSON.parse(JSON.stringify(playerStats)))
              .then((): void => {
                this._playersRankingsEmitter.emit(new PageAction(++saved.number, playersStats.size, 'save'));
              }).catch((error): void => console.log(error));

            subscription.unsubscribe();
          });
        }, 50 * saved.number);
      }
    });

    await this.delay(50 * playersStats.size);
  }

  private delay = async (ms: number): Promise<unknown> => new Promise(res => setTimeout(res, ms));

  private async atomicIncrement(): Promise<number> {
    return 1;
  }

  get playersRankingsEmitter(): EventEmitter<PageAction> {
    return this._playersRankingsEmitter;
  }
}
