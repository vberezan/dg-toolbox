import {AfterViewInit, ChangeDetectorRef, Component, inject, Optional} from '@angular/core';
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
export class RankingsPanelComponent implements AfterViewInit {
  private playerRankingsService: PlayerRankingsService = inject(PlayerRankingsService);
  private authService: AuthService = inject(AuthService);
  private localStorageService: LocalStorageService = inject(LocalStorageService);
  private changeDetector: ChangeDetectorRef = inject(ChangeDetectorRef);
  private readonly page: number;

  protected rankings: Map<number, PlayerStats> = new Map<number, PlayerStats>();
  protected authenticated: boolean = false;
  protected readonly Math = Math;
  protected sortOrder: string = 'desc';
  protected sortKey: string = 'score';

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
        if (this.localStorageService.get(LocalStorageKeys.PLAYERS_RANKINGS_SORT) === null) {
          this.localStorageService.cache(LocalStorageKeys.PLAYERS_RANKINGS_SORT, 'score:desc');
        }
        const sortKey: string = this.localStorageService.get(LocalStorageKeys.PLAYERS_RANKINGS_SORT).split(/:/)[0];

        this.orderBy(sortKey,  false);
      }
    });

    this.authService.checkLoginValidity();
    this.playerRankingsService.fixPaginationDisplay(this.page);
  }

  ngAfterViewInit(): void {
    this.changeDetector.detectChanges();
  }

  public orderBy(sortKey: string, @Optional() switchOrder:boolean = true): void {
    let sort: string = this.localStorageService.get(LocalStorageKeys.PLAYERS_RANKINGS_SORT);
    if (sort === null) sort = 'score:desc';

    let [currentSortKey, sortOrder] = sort.split(/:/);

    if (sortKey !== currentSortKey) sortOrder = 'asc';
    if (switchOrder) sortOrder = sortOrder === 'desc' ? 'asc' : 'desc';
    sort = sortKey.concat(':', sortOrder);

    this.rankings = this.playerRankingsService.fetchAndClear(sortKey, sortOrder, this.page, 100);

    this.sortKey = sortKey;
    this.sortOrder = sortOrder;

    if (switchOrder) {
      this.changeDetector.detectChanges();
    }

    this.localStorageService.cache(LocalStorageKeys.PLAYERS_RANKINGS_SORT, sort);
  }
}
