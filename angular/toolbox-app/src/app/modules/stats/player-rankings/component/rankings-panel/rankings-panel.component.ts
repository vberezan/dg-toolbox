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
  private dgApi: DarkgalaxyApiService = inject(DarkgalaxyApiService);
  public rankings: Map<number, PlayerStats> = new Map<number, PlayerStats>();

  constructor() {
  }
}
