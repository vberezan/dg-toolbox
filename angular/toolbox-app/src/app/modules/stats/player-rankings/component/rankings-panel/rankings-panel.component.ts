import {Component, inject} from '@angular/core';
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
    this.page = 1;

    this.authService.authState.subscribe((state: AuthState): void => {
      this.authenticated = state.status;

      if (this.authenticated) {
        if (this.localStorageService.get(LocalStorageKeys.PLAYER_RANKINGS_SORT_MAP) === null) {
          this.localStorageService.cache(LocalStorageKeys.PLAYER_RANKINGS_SORT_MAP, ['score:asc']);
        }

        this.orderBy('score', 'desc');
      }
    });

    this.authService.checkLoginValidity();
  }

  public orderBy(sortKey: string, sortOrder: string): void {
    let sortMap: string[] = this.localStorageService.get(LocalStorageKeys.PLAYER_RANKINGS_SORT_MAP);

    let hasKey: boolean = false;
    let keyPos: number = 0;
    let order: string = 'desc';

    for (let i: number = 0; i < sortMap.length; i++) {
      if (sortMap[i].split(':')[0] === sortKey) {
        hasKey = true;
        keyPos = i;
        order = sortMap[i].split(':')[1];
        break;
      }
    }

    if (hasKey) {
      if (order === 'desc') {
        sortMap[keyPos] = sortKey + ':asc';
      } else {
        sortMap[keyPos] = sortKey + ':desc';
      }
    } else {
      sortMap.push(sortKey + ':' + sortOrder);
    }

    this.rankings = this.playerRankingsService.fetchAndClear(sortKey,
      sortMap[keyPos].split(/:/)[1],
      this.page,
      100);
    this.localStorageService.cache(LocalStorageKeys.PLAYER_RANKINGS_SORT_MAP, sortMap);
  }
}
