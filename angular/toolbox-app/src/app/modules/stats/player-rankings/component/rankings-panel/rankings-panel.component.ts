import {Component, inject, Optional} from '@angular/core';
import {PlayerRankingsService} from "../../service/player-rankings.service";
import {PlayerStats} from "../../../../../shared/model/stats/player-stats.model";
import {AuthState} from "../../../../../shared/model/authentication/auth-state.model";
import {AuthService} from "../../../../authentication/service/auth.service";
import {LocalStorageService} from "../../../../local-storage/local-storage-manager/service/local-storage.service";
import {LocalStorageKeys} from "../../../../../shared/model/local-storage/local-storage-keys";

@Component({
  selector: 'dgt-players-rankings',
  templateUrl: './rankings-panel.component.html',
  styleUrls: ['./rankings-panel.component.css']
})
export class RankingsPanelComponent {
  private playerRankingsService: PlayerRankingsService = inject(PlayerRankingsService);
  private authService: AuthService = inject(AuthService);
  private localStorageService: LocalStorageService = inject(LocalStorageService);
  private readonly page: number;

  public rankings: Map<number, PlayerStats> = new Map<number, PlayerStats>();
  public authenticated: boolean = false;
  protected readonly Math = Math;

  constructor() {
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

    this.authService.authState.subscribe((state: AuthState): void => {
      this.authenticated = state.status;

      if (this.authenticated) {
        if (this.localStorageService.get(LocalStorageKeys.PLAYER_RANKINGS_SORT) === null) {
          this.localStorageService.cache(LocalStorageKeys.PLAYER_RANKINGS_SORT, 'score:desc');
        }
        const sortKey: string = this.localStorageService.get(LocalStorageKeys.PLAYER_RANKINGS_SORT).split(/:/)[0];

        this.orderBy(sortKey,  false);
      }
    });

    this.authService.checkLoginValidity();
  }

  public orderBy(sortKey: string, @Optional() switchOrder:boolean = true): void {
    let sort: string = this.localStorageService.get(LocalStorageKeys.PLAYER_RANKINGS_SORT);
    const sortOrder: string = this.localStorageService.get(LocalStorageKeys.PLAYER_RANKINGS_SORT).split(/:/)[1];

    if (switchOrder) {
      if (sortOrder === 'desc') {
        sort = sortKey + ':asc';
      } else {
        sort = sortKey + ':desc';
      }
    }

    this.rankings = this.playerRankingsService.fetchAndClear(sortKey,
      sort.split(/:/)[1],
      this.page,
      100);
    this.localStorageService.cache(LocalStorageKeys.PLAYER_RANKINGS_SORT, sort);
  }
}
