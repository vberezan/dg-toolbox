import {ChangeDetectorRef, Component, inject} from '@angular/core';
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
  private changeDetection: ChangeDetectorRef = inject(ChangeDetectorRef);
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
        this.orderBy('score', 'desc');
      }
    });

    this.authService.checkLoginValidity();
  }

  public orderBy(key: string, order: string): void {
    if (this.localStorageService.get(LocalStorageKeys.PLAYER_RANKINGS_SORT_MAP) === null) {
      this.localStorageService.cache(LocalStorageKeys.PLAYER_RANKINGS_SORT_MAP, new Map<string, string>());
    }
    let sortMap: Map<string, string> = this.localStorageService.get(LocalStorageKeys.PLAYER_RANKINGS_SORT_MAP);

    if (sortMap.has(key)) {
      if (sortMap.get(key) === 'desc') {
        sortMap.set(key, 'asc');
      } else {
        sortMap.set(key, 'desc');
      }
    } else {
      sortMap.set(key, 'desc');
    }

    this.localStorageService.cache(LocalStorageKeys.PLAYER_RANKINGS_SORT_MAP, sortMap);

    this.rankings = this.playerRankingsService.fetchAndClear(key, sortMap.get(key), this.page, 100);
    this.changeDetection.detectChanges();
  }
}
