import {Component, inject} from '@angular/core';
import {PlayerRankingsService} from "../../service/player-rankings.service";
import {DarkgalaxyApiService} from "../../../../darkgalaxy-ui-parser/service/darkgalaxy-api.service";
import {PlayerStats} from "../../../../../shared/model/stats/player-stats.model";

@Component({
  selector: 'dgt-players-rankings',
  templateUrl: './rankings-panel.component.html',
  styleUrls: ['./rankings-panel.component.css']
})
export class RankingsPanelComponent {
  private playerRankingsService: PlayerRankingsService = inject(PlayerRankingsService);
  public rankings: Map<number, PlayerStats> = new Map<number, PlayerStats>();

  constructor() {
    this.rankings = this.playerRankingsService.playerStats();
  }
}
