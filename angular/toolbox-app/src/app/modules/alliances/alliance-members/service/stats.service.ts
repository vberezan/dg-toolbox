import {EventEmitter, inject, Injectable} from '@angular/core';
import {AllianceMember} from "../../../../shared/model/alliances/alliance-member.model";
import {AllianceMemberStats} from "../../../../shared/model/alliances/alliance-member-stats.model";
import {LocalStorageService} from "../../../local-storage-manager/service/local-storage.service";
import {LocalStorageKeys} from "../../../../shared/model/local-storage/local-storage-keys";
import {PlayerStatsCache} from "../../../../shared/model/stats/player-stats-cache.model";


@Injectable({
  providedIn: 'root'
})
export class StatsService {
  private localStorageService: LocalStorageService = inject(LocalStorageService);
  private _statsEventEmitter: EventEmitter<AllianceMemberStats> = new EventEmitter<AllianceMemberStats>();

  loadStats(allianceMembers: AllianceMember[]): void {
    let names: string[] = allianceMembers.map((member) => member.name.toLowerCase());

    this.localStorageService.get(LocalStorageKeys.PLAYERS_STATS).forEach((playerStats: PlayerStatsCache): void => {

      console.log(playerStats);

      let event: AllianceMemberStats = new AllianceMemberStats();
      event.name = playerStats.name;
      event.score = playerStats.score;
      event.combatScore = playerStats.combatScore;
      event.rank = playerStats.rank;
      event.planets = playerStats.planets;

      if (names.indexOf(playerStats.name.toLowerCase()) >= 0) {
        this._statsEventEmitter.emit(event);
      }
    });
  }


  get statsEventEmitter(): EventEmitter<AllianceMemberStats> {
    return this._statsEventEmitter;
  }
}

