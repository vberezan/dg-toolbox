import {EventEmitter, inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {collection, collectionData, doc, Firestore, query, setDoc, where} from "@angular/fire/firestore";
import {DarkgalaxyApiService} from "../../../darkgalaxy-ui-parser/service/darkgalaxy-api.service";
import {firstValueFrom, Subscription} from "rxjs";
import {PlayerStats} from "../../../../shared/model/stats/player-stats.model";
import {DocumentData} from "@angular/fire/compat/firestore";
import {PlanetScan} from "../../../../shared/model/scans/shared-scans-planet-scan.model";
import {PlanetStats} from "../../../../shared/model/stats/planet-stats.model";

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
    const planetsRef: any = collection(this.firestore, 'planets');

    let isScanActive: boolean = true;

    cancelScanEmitter.subscribe((value: boolean): void => {
      isScanActive = !value;
    });

    let playerStats: Map<number, PlayerStats> = new Map<number, PlayerStats>();
    let source: string = await firstValueFrom(this.httpClient.get(this.PLAYER_RANKINGS_URL, {responseType: 'text'}));
    let dom: Document = new DOMParser().parseFromString(source, 'text/html');
    const pages:number = parseInt(dom.querySelector('.right.lightBorder.opacDarkBackground.padding').textContent.trim().split('of')[dom.querySelector('.right.lightBorder.opacDarkBackground.padding').textContent.trim().split('of').length - 1].trim());

    for (let page: number = 1; page <= pages; page++) {
      if (isScanActive) {
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
          player.combinedScore = player.combatScore + player.score;
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

          if (!playerStats.has(playerId)) {
            playerStats.set(playerId, new PlayerStats());
          }

          let player: PlayerStats = playerStats.get(playerId);

          player.combatScore = parseInt(row.querySelector('.score').textContent.trim().replace(/,/g, ''));
          player.combinedScore = player.combatScore + player.score;
        });

        console.log(playerStats);

        await this.delay(scanDelay);
      }
    }

    if (isScanActive) {
      playerStats.forEach((playerStats: PlayerStats, playerId: number): void => {
        let planetsSubscription: Subscription = collectionData(
          query(playersRef,
            where('playerId', '==', playerId)
          )
        ).subscribe((items: DocumentData[]): void => {
          Object.assign([], items).forEach((planetStats: PlanetStats): void => {
            playerStats.planets.push(planetStats.location);
          });

          setDoc(doc(playersRef, playerId.toString()), JSON.parse(JSON.stringify(playerStats)))
            .catch((error): void => {
              console.log(error);
            });

          planetsSubscription.unsubscribe();
        });
      });
    }
  }

  async scanAllianceRankingsScreens(): Promise<void> {

  }

  private delay = async (ms: number): Promise<unknown> => new Promise(res => setTimeout(res, ms));
}
