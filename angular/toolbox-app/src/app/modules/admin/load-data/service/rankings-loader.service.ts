import {EventEmitter, inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {collection, doc, Firestore, setDoc} from "@angular/fire/firestore";
import {DarkgalaxyApiService} from "../../../darkgalaxy-ui-parser/service/darkgalaxy-api.service";
import {firstValueFrom} from "rxjs";
import {PlayerStats} from "../../../../shared/model/stats/player-stats.model";

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


  async scanPlayerRankingsScreens(cancelScanEmitter: EventEmitter<boolean>): Promise<void> {
    const scanDelay: number = 1500 + Math.floor(Math.random() * 1500);
    const playersRef: any = collection(this.firestore, 'players');

    let isScanActive: boolean = true;

    cancelScanEmitter.subscribe((value: boolean): void => {
      isScanActive = !value;
    });

    let playerStats: Map<number, PlayerStats> = new Map<number, PlayerStats>();
    let source: string = await firstValueFrom(this.httpClient.get(this.PLAYER_RANKINGS_URL, {responseType: 'text'}));
    let dom: Document = new DOMParser().parseFromString(source, 'text/html');
    const pages:number = parseInt(dom.querySelector('.right.lightBorder.opacDarkBackground.padding').textContent.trim().split('of')[dom.querySelector('.right.lightBorder.opacDarkBackground.padding').textContent.trim().split('of').length - 1].trim());

    for (let page: number = 1; page <= pages; page++) {
      if (!isScanActive) {
        break;
      }

      source = await firstValueFrom(this.httpClient.get(this.PLAYER_RANKINGS_URL + page, {responseType: 'text'}));
      dom = new DOMParser().parseFromString(source, 'text/html');

      dom.querySelectorAll('.rankingsList .entry').forEach((row: any): void => {
        const playerId: number = parseInt(row.querySelector('.playerName').attributes['playerId'].value.trim());

        if (!playerStats.has(playerId)) {
          playerStats.set(playerId, new PlayerStats());
        }

        let player: PlayerStats = playerStats.get(playerId);

        player.playerId = playerId;
        player.name = row.querySelector('.playerName').textContent.trim().toLowerCase();
        player.rank = parseInt(row.querySelector('.rank').textContent.trim().replace(/,/g, ''));
        player.score = parseInt(row.querySelector('.score').textContent.trim().replace(/,/g, ''));
        if (row.querySelector('.allianceName')) {
          player.alliance = row.querySelector('.allianceName').textContent.trim().toLowerCase().replace(/\[/g, '').replace(/]/g, '');
        } else {
          player.alliance = '-';
        }
      });

      source = await firstValueFrom(this.httpClient.get(this.PLAYER_COMBAT_RANKINGS_URL + page, {responseType: 'text'}));
      dom = new DOMParser().parseFromString(source, 'text/html');

      dom.querySelectorAll('.rankingsList .entry').forEach((row: any): void => {
        const playerId: number = parseInt(row.querySelector('.playerName').attributes['playerId'].value.trim());
        let player: PlayerStats = playerStats.get(playerId);

        player.combatScore = parseInt(row.querySelector('.score').textContent.trim().replace(/,/g, ''));
        player.combinedScore = player.combatScore + player.score;
      });

      await this.delay(scanDelay);
    }

    if (!isScanActive) {
      playerStats.forEach((playerStats: PlayerStats, playerId: number): void => {
        setDoc(doc(playersRef, playerId.toString()), JSON.parse(JSON.stringify(playerStats)))
          .catch((error): void => {
            console.log(error);
          });
      });
    }
  }

  async scanAllianceRankingsScreens(): Promise<void> {

  }

  private delay = async (ms: number): Promise<unknown> => new Promise(res => setTimeout(res, ms));
}
