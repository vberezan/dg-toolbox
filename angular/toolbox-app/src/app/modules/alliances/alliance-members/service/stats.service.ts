import {EventEmitter, inject, Injectable} from '@angular/core';
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

    if (this.localStorageService.get(LocalStorageKeys.PLAYER_STATS) &&
      (this.localStorageService.get(LocalStorageKeys.LAST_PLAYERS_RANKINGS_UPDATE_TURN) < this.dgAPI.gameTurn())) {
      this.localStorageService.get(LocalStorageKeys.PLAYER_STATS).forEach((stat: AllianceMemberStats): void => {
        this._statsEventEmitter.emit(stat);
      });
    } else {
      const playersRef: any = collection(this.firestore, 'players');
      const names: string[] = allianceMembers.map((member: AllianceMember) => member.name.toLowerCase());

      let planetsSubscription: Subscription = collectionData(
        query(playersRef,
          where('name', 'in', names)
        )
      ).subscribe((items: DocumentData[]): void => {
        let stats: PlayerStats[] = Object.assign([], items);
        let cache: AllianceMemberStats[] = [];

        stats.forEach((playerStats: PlayerStats): void => {
          let event: AllianceMemberStats = new AllianceMemberStats();
          event.name = playerStats.name;
          event.score = playerStats.score;
          event.combatScore = playerStats.combatScore;
          event.rank = playerStats.rank;
          event.planets = playerStats.planets.length;

          cache.push(event);
          this._statsEventEmitter.emit(event);
        });

        this.localStorageService.cache(LocalStorageKeys.PLAYER_STATS, cache);

        planetsSubscription.unsubscribe();
      });
    }
  }


  get statsEventEmitter(): EventEmitter<AllianceMemberStats> {
    return this._statsEventEmitter;
  }
}

