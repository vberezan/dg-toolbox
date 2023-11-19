import {inject, Injectable} from '@angular/core';
import {DarkgalaxyApiService} from "../../../darkgalaxy-ui-parser/service/darkgalaxy-api.service";
import {PlayerStats} from "../../../../shared/model/stats/player-stats.model";

@Injectable({
  providedIn: 'root'
})
export class PlayerRankingsService {
  private dgApi: DarkgalaxyApiService = inject(DarkgalaxyApiService);

  constructor() { }

  playerStats(): Map<number, PlayerStats> {
    return this.dgApi.playerRankings();
  }
}
