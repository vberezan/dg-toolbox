import {EventEmitter, inject, Injectable, OnDestroy} from '@angular/core';
import {collection, collectionData, Firestore, query, where} from "@angular/fire/firestore";
import {Subscription} from "rxjs";
import {DocumentData} from "@angular/fire/compat/firestore";
import {PlayerStats} from "../../../../shared/model/stats/player-stats.model";
import {AllianceMember} from "../../../../shared/model/alliances/alliance-member.model";
import {AllianceMemberStats} from "../../../../shared/model/alliances/alliance-member-stats.model";
import {LocalStorageService} from "../../../local-storage-manager/service/local-storage.service";
import {LocalStorageKeys} from "../../../../shared/model/local-storage/local-storage-keys";
import {DarkgalaxyApiService} from "../../../darkgalaxy-ui-parser/service/darkgalaxy-api.service";


@Injectable({
  providedIn: 'root'
})
export class StatsService {
  private firestore: Firestore = inject(Firestore);
  private dgAPI: DarkgalaxyApiService = inject(DarkgalaxyApiService);
  private localStorageService: LocalStorageService = inject(LocalStorageService);
  private _statsEventEmitter: EventEmitter<AllianceMemberStats> = new EventEmitter<AllianceMemberStats>();

  loadStats(allianceMembers: AllianceMember[]): void {

    if (this.localStorageService.get(LocalStorageKeys.LAST_PLAYERS_RANKINGS_UPDATE_TURN) < this.dgAPI.gameTurn()) {
      return this.localStorageService.get(LocalStorageKeys.PLAYER_STATS);
    } else {
      const playersRef: any = collection(this.firestore, 'players');
      const names: string[] = allianceMembers.map((member: AllianceMember) => member.name.toLowerCase());

      let planetsSubscription: Subscription = collectionData(
        query(playersRef,
          where('name', 'in', names)
        )
      ).subscribe((items: DocumentData[]): void => {
        let stats: PlayerStats[] = Object.assign([], items);

        stats.forEach((playerStats: PlayerStats): void => {
          let stats: AllianceMemberStats = new AllianceMemberStats();
          stats.name = playerStats.name;
          stats.score = playerStats.score;
          stats.combatScore = playerStats.combatScore;
          stats.rank = playerStats.rank;
          stats.planets = playerStats.planets.length;

          this._statsEventEmitter.emit(stats);
        });

        this.localStorageService.cache(LocalStorageKeys.PLAYER_STATS, stats);

        planetsSubscription.unsubscribe();
      });
    }
  }


  get statsEventEmitter(): EventEmitter<AllianceMemberStats> {
    return this._statsEventEmitter;
  }
}

