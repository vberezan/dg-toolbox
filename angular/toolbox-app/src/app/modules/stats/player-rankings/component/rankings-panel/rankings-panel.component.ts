import {ChangeDetectorRef, Component, inject} from '@angular/core';
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
  private changeDetection: ChangeDetectorRef = inject(ChangeDetectorRef);
  private sortMap: Map<string, string> = new Map<string, string>();
  public authenticated: boolean = false;
  private page: number;

  constructor() {
    this.authService.authState.subscribe((state: AuthState): void => {
      this.authenticated = state.status;

      if (this.authenticated) {
        this.rankings = this.playerRankingsService.fetchAndClear();
      }
    });

    this.authService.checkLoginValidity();
    this.sortMap.set('score', 'asc');
    const pageLocation: string[] = window.location.pathname.split(/\//);
    switch (pageLocation.length) {
      case 4:
        this.page = 1;
        break;
      case 5:
        this.page = parseInt(pageLocation[3]);
        break;
      default:
        this.page = 1;
        break;
    }


    this.page = 1;
  }

  protected readonly Math = Math;


  public orderBy(key: string, order: string): void {
    if (this.sortMap.has(key)) {
      if (this.sortMap.get(key) === 'desc') {
        this.sortMap.set(key, 'asc');
      } else {
        this.sortMap.set(key, 'desc');
      }
    } else {
      this.sortMap.set(key, 'desc');
    }

    this.rankings = this.playerRankingsService.orderBy(key, this.sortMap.get(key), this.page, 100);
    this.changeDetection.detectChanges();
  }
}
