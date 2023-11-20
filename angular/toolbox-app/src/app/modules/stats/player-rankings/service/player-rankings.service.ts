import {inject, Injectable} from '@angular/core';
import {DarkgalaxyApiService} from "../../../darkgalaxy-ui-parser/service/darkgalaxy-api.service";
import {PlayerStats} from "../../../../shared/model/stats/player-stats.model";
import {LocalStorageKeys} from "../../../../shared/model/local-storage/local-storage-keys";
import {LocalStorageService} from "../../../local-storage/local-storage-manager/service/local-storage.service";

@Injectable({
  providedIn: 'root'
})
export class PlayerRankingsService {
  private dgApi: DarkgalaxyApiService = inject(DarkgalaxyApiService);
  private localStorageService: LocalStorageService = inject(LocalStorageService);

  constructor() { }

  fetchAndClear(): Map<number, PlayerStats> {
    let rankings: Map<number, PlayerStats> = this.dgApi.playerRankings();

    const cachedStats: PlayerStats[] = this.localStorageService.get(LocalStorageKeys.PLAYERS_STATS);

    for (const player of cachedStats) {
      const ranking: PlayerStats = rankings.get(player.playerId);

      if (ranking) {
        ranking.planets = player.planets;
        ranking.g1449Total = player.g1449Total;
        ranking.g213Total = player.g213Total;
        ranking.g1Total = player.g1Total;
        ranking.relation = player.relation;
      }
    }

    // document.querySelector('.playerRankingsList').remove();

    return rankings;
  }

}
