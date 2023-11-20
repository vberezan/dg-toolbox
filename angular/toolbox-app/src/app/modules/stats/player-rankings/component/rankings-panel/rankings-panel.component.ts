import {Component, inject} from '@angular/core';
import {PlayerRankingsService} from "../../service/player-rankings.service";
import {PlayerStats} from "../../../../../shared/model/stats/player-stats.model";
import {LocalStorageService} from "../../../../local-storage/local-storage-manager/service/local-storage.service";
import {LocalStorageKeys} from "../../../../../shared/model/local-storage/local-storage-keys";

@Component({
  selector: 'dgt-players-rankings',
  templateUrl: './rankings-panel.component.html',
  styleUrls: ['./rankings-panel.component.css']
})
export class RankingsPanelComponent {
  private playerRankingsService: PlayerRankingsService = inject(PlayerRankingsService);
  private localStorageService: LocalStorageService = inject(LocalStorageService);
  public rankings: Map<number, PlayerStats> = new Map<number, PlayerStats>();

  constructor() {
    this.rankings = this.playerRankingsService.playerStats();
    const cachedStats: PlayerStats[] = this.localStorageService.get(LocalStorageKeys.PLAYERS_STATS);

    for (const player of cachedStats) {
      const ranking: PlayerStats = this.rankings.get(player.playerId);
      if (ranking) {
        ranking.planets = player.planets;
        ranking.g1449Total = player.g1449Total;
        ranking.g213Total = player.g213Total;
        ranking.g1Total = player.g1Total;
      }
    }
  }
}
