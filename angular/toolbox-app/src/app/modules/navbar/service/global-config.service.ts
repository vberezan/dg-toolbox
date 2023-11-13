import {inject, Injectable} from '@angular/core';
import {collection, collectionData, doc, docData, Firestore, query} from "@angular/fire/firestore";
import {LocalStorageService} from "../../local-storage-manager/service/local-storage.service";
import {DocumentData} from "@angular/fire/compat/firestore";
import {LocalStorageKeys} from "../../../shared/model/local-storage/local-storage-keys";
import {Subscription} from "rxjs";
import {PlayerStats} from "../../../shared/model/stats/player-stats.model";
import {PlayerStatsCache} from "../../../shared/model/stats/player-stats-cache.model";

@Injectable({
  providedIn: 'root'
})
export class GlobalConfigService {
  private firestore: Firestore = inject(Firestore);
  private localStorageService: LocalStorageService = inject(LocalStorageService);

  checkAndCachePlayersRankings(): void {
    let playerSubscription: Subscription = docData(
      doc(collection(this.firestore, 'config'), 'last-players-rankings-update-turn')
    ).subscribe((item: DocumentData): void => {
      if (this.localStorageService.get(LocalStorageKeys.LAST_PLAYERS_RANKINGS_UPDATE_TURN) &&
        (this.localStorageService.get(LocalStorageKeys.LAST_PLAYERS_RANKINGS_UPDATE_TURN) == Object.assign({value: 0}, item).value)) {
        playerSubscription.unsubscribe();
        return;
      } else {
        let planetsSubscription: Subscription = collectionData(
          query(collection(this.firestore, 'players'))
        ).subscribe((items: DocumentData[]): void => {
          let stats: PlayerStats[] = Object.assign([], items);
          let cache: PlayerStatsCache[] = [];

          stats.forEach((stat: PlayerStats): void => {
            let psc: PlayerStatsCache = new PlayerStatsCache();
            psc.playerId = stat.playerId;
            psc.rank = stat.rank;
            psc.planets = stat.planets.length;
            psc.name = stat.name;
            psc.alliance = stat.alliance;
            psc.combatScore = stat.combatScore;
            psc.combinedScore = stat.combinedScore;
            psc.score = stat.score;

            cache.push(psc);
          });

          this.localStorageService.cache(LocalStorageKeys.PLAYERS_STATS, cache);
          this.localStorageService.cache(LocalStorageKeys.LAST_PLAYERS_RANKINGS_UPDATE_TURN, Object.assign({value: 0}, item).value);
          planetsSubscription.unsubscribe();
          playerSubscription.unsubscribe();
        });
      }
    });
  }
}
