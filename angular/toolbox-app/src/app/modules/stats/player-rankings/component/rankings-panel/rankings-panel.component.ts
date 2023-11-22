import {Component, inject} from '@angular/core';
import {PlayerRankingsService} from "../../service/player-rankings.service";
import {PlayerStats} from "../../../../../shared/model/stats/player-stats.model";
import {AuthState} from "../../../../../shared/model/authentication/auth-state.model";
import {AuthService} from "../../../../authentication/service/auth.service";

@Component({
  selector: 'dgt-players-rankings',
  templateUrl: './rankings-panel.component.html',
  styleUrls: ['./rankings-panel.component.css']
})
export class RankingsPanelComponent {
  private playerRankingsService: PlayerRankingsService = inject(PlayerRankingsService);
  public rankings: Map<number, PlayerStats> = new Map<number, PlayerStats>();
  private authService: AuthService = inject(AuthService);

  public authenticated: boolean = false;

  constructor() {
    this.authService.authState.subscribe((state: AuthState): void => {
      this.authenticated = state.status;

      if (this.authenticated) {
        this.rankings = this.playerRankingsService.fetchAndClear();
      }
    });

    this.authService.checkLoginValidity();
  }

  protected readonly Math = Math;
}
