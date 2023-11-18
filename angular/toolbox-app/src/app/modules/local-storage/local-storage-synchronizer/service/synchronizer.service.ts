import {inject, Injectable} from '@angular/core';
import {collection, collectionData, doc, docData, Firestore, query} from "@angular/fire/firestore";
import {LocalStorageService} from "../../local-storage-manager/service/local-storage.service";
import {Subscription} from "rxjs";
import {DocumentData} from "@angular/fire/compat/firestore";
import {LocalStorageKeys} from "../../../../shared/model/local-storage/local-storage-keys";
import {PlayerStats} from "../../../../shared/model/stats/player-stats.model";
import {PlayerStatsCache} from "../../../../shared/model/stats/player-stats-cache.model";

@Injectable({
  providedIn: 'root'
})
export class SynchronizerService {
  private firestore: Firestore = inject(Firestore);
  private localStorageService: LocalStorageService = inject(LocalStorageService);


  constructor() {
  }

  loadTurnBasedUpdates(turn: number): void {
    if (this.localStorageService.get(LocalStorageKeys.ALLIANCE_MEMBERS) == null ||
      turn > this.localStorageService.get(LocalStorageKeys.LAST_PLAYERS_RANKINGS_UPDATE_TURN)) {
      this.loadPlayersRankings(turn);
    }
  }

  loadLiveUpdates(): void {
    this.loadVersion();
  }

  private loadVersion(): void {
    const collectionPath: any = collection(this.firestore, 'config');
    const documentPath: string = 'version';

    if (this.localStorageService.isExpired(LocalStorageKeys.REMOTE_VERSION)) {
      let subscription: Subscription = docData(
        doc(collectionPath, documentPath)
      ).subscribe((item: DocumentData): void => {
        let newVersion: string = Object.assign({value: ''}, item).value;

        this.localStorageService.cache(LocalStorageKeys.REMOTE_VERSION, newVersion, 300000);

        subscription.unsubscribe();
      });
    }
  }

  private loadPlayersRankings(turn: number): void {
    const collectionPath: any = collection(this.firestore, 'players-rankings');

    let subscription: Subscription = collectionData(
      query(collection(this.firestore, collectionPath))
    ).subscribe((items: DocumentData[]): void => {
      let stats: PlayerStats[] = Object.assign([], items);
      let cache: PlayerStatsCache[] = [];

      stats.forEach((stat: PlayerStats): void => {
        let psc: PlayerStatsCache = new PlayerStatsCache();
        psc.playerId = stat.playerId;
        psc.rank = stat.rank;
        psc.planets = stat.planets;
        psc.name = stat.name;
        psc.alliance = stat.alliance;
        psc.combatScore = stat.combatScore;
        psc.combinedScore = stat.combinedScore;
        psc.score = stat.score;

        cache.push(psc);
      });

      this.localStorageService.cache(LocalStorageKeys.PLAYERS_STATS, cache);
      this.localStorageService.cache(LocalStorageKeys.LAST_PLAYERS_RANKINGS_UPDATE_TURN, turn);
      subscription.unsubscribe();
    });
  }
}
