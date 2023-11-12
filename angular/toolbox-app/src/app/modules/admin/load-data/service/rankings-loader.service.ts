import {EventEmitter, inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {collection, collectionData, doc, docData, Firestore, limit, query, setDoc, updateDoc, where} from "@angular/fire/firestore";
import {DarkgalaxyApiService} from "../../../darkgalaxy-ui-parser/service/darkgalaxy-api.service";
import {firstValueFrom, Subscription} from "rxjs";
import {PlayerStats} from "../../../../shared/model/stats/player-stats.model";
import {DocumentData} from "@angular/fire/compat/firestore";
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

  private _playersRankingsEmitter: EventEmitter<{ 'total': number, 'page': number, 'action': string }>
    = new EventEmitter<{ 'total': number, 'page': number, 'action': string }>();


  async scanPlayerRankingsScreens(cancelScanEmitter: EventEmitter<boolean>): Promise<void> {
    const scanDelay: number = 1500 + Math.floor(Math.random() * 1500);
    const playersRef: any = collection(this.firestore, 'players');
    const planetsRef: any = collection(this.firestore, 'planets');
    const configRef: any = collection(this.firestore, 'config');


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


    // -- FIXME: do it more elegant, without so many subscriptions
    // -- get last navigation scan turn
    let savedRankings: number = 0;
    let navigationSubscription: Subscription = docData(
      doc(configRef, 'last-navigation-scan-turn')
    ).subscribe((item: DocumentData): void => {
      let navigationScanTurn: number = Object.assign({value: 0}, item).value;

      // -- get last player rankings scan turn
      let rankingsSubscription: Subscription = docData(
        doc(configRef, 'last-player-rankings-scan-turn')
      ).subscribe((item: DocumentData): void => {
        let playerRankingsScanTurn: number = Object.assign({value: 0}, item).value;

        // -- if there is a newer navigation scan, update player rankings planets
        if (navigationScanTurn >= playerRankingsScanTurn) {
          playersStats.forEach((playerStats: PlayerStats, playerId: number): void => {
            if (isScanActive) {
              setTimeout((): void => {
                let planetsSubscription: Subscription = collectionData(
                  query(planetsRef,
                    where('playerId', '==', playerId)
                  )
                ).subscribe((items: DocumentData[]): void => {
                  let planets: PlanetStats[] = Object.assign([], items);
                  planets.forEach((planetStats: PlanetStats): void => {
                    playerStats.planets.push(planetStats.location);
                  });

                  setDoc(doc(playersRef, playerId.toString()), JSON.parse(JSON.stringify(playerStats)))
                    .then((): void => {
                      this._playersRankingsEmitter.emit({'action': 'save', 'page': ++savedRankings, 'total': playersStats.size});
                    }).catch((error): void => {
                      console.log(error);
                    }
                  );

                  planetsSubscription.unsubscribe();
                });
              }, 50 * savedRankings);
            }
          });
        } else {
          let savedRankings: number = 0;
          playersStats.forEach((playerStats: PlayerStats, playerId: number): void => {
            if (isScanActive) {
              setTimeout((): void => {
                let planetsSubscription: Subscription = collectionData(
                  query(playersRef,
                    where('playerId', '==', playerId),
                    limit(1)
                  )
                ).subscribe((items: DocumentData[]): void => {
                  let player: PlayerStats = Object.assign(new PlayerStats(), items[0]);
                  playerStats.planets = player.planets;

                  updateDoc(doc(playersRef, playerId.toString()), JSON.parse(JSON.stringify(playerStats)))
                    .then((): void => {
                      this._playersRankingsEmitter.emit({'action': 'save', 'page': ++savedRankings, 'total': playersStats.size});
                    }).catch((error): void => {
                      console.log(error);
                    }
                  );

                  planetsSubscription.unsubscribe();
                });
              }, 50 * savedRankings);
            }
          });
        }
        rankingsSubscription.unsubscribe();
      });
      navigationSubscription.unsubscribe();
    });

    while (savedRankings < playersStats.size) {
      console.log(savedRankings);
      await this.delay(1000);
    }
  }

  async scanAllianceRankingsScreens(): Promise<void> {

  }

  private delay = async (ms: number): Promise<unknown> => new Promise(res => setTimeout(res, ms));


  get playersRankingsEmitter(): EventEmitter<{ 'total': number, 'page': number, 'action': string }> {
    return this._playersRankingsEmitter;
  }
}
