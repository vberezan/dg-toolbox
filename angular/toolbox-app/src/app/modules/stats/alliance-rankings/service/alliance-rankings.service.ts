import {inject, Injectable, Optional} from '@angular/core';
import {LocalStorageService} from "../../../local-storage/local-storage-manager/service/local-storage.service";
import {LocalStorageKeys} from "../../../../shared/model/local-storage/local-storage-keys";
import {AllianceStats} from "../../../../shared/model/stats/alliance-stats.model";
import {dom} from "@fortawesome/fontawesome-svg-core";

@Injectable({
  providedIn: 'root'
})
export class AllianceRankingsService {
  private localStorageService: LocalStorageService = inject(LocalStorageService);

  constructor() {
  }

  fetchAndClear(key: string,
                order: string,
                page: number,
                pageSize: number,
                @Optional() clear: boolean = false): Map<string, AllianceStats> {
    let orderedRankings: Map<string, AllianceStats> = new Map<string, AllianceStats>();
    const cachedStats: AllianceStats[] = this.localStorageService.get(LocalStorageKeys.ALLIANCES_STATS);
    if (cachedStats === null) return orderedRankings;

    for (let i: number = 0; i < cachedStats.length - 1; i++) {
      for (let j: number = i + 1; j < cachedStats.length; j++) {
        let sortCondition: boolean = false;

        switch (key) {
          case 'combinedScore':
          case 'combatScore':
          case 'avgScore':
          case 'score':
          case 'planets':
          case 'g1Total':
          case 'g213Total':
          case 'g1449Total':
            if (order === 'desc') {
              cachedStats[i][key] < cachedStats[j][key] ? sortCondition = true : sortCondition = false;
            } else {
              cachedStats[i][key] > cachedStats[j][key] ? sortCondition = true : sortCondition = false;
            }
            break;
          default:
            break;
        }

        if (sortCondition) {
          const aux: AllianceStats = cachedStats[i];
          cachedStats[i] = cachedStats[j];
          cachedStats[j] = aux;
        }
      }
    }

    if (cachedStats.length > pageSize * page) {
      for (let i: number = pageSize * (page - 1); i < pageSize * page; i++) {
        cachedStats[i].rank = i + 1;
        orderedRankings.set(cachedStats[i].tag, cachedStats[i]);
      }
    } else {
      for (let i: number = cachedStats.length % 100; i < cachedStats.length; i++) {
        cachedStats[i].rank = i + 1;
        orderedRankings.set(cachedStats[i].tag, cachedStats[i]);
      }
    }

    if (clear && document.querySelector('.alliancesRankingsList')) {
      document.querySelector('.alliancesRankingsList').remove();
    }

    return orderedRankings;
  }

  fixPaginationDisplay(page: number): void {
    if (this.localStorageService.get(LocalStorageKeys.ALLIANCES_STATS) === null) return;
    const size: number = this.localStorageService.get(LocalStorageKeys.ALLIANCES_STATS).length;

    if (document.querySelector('#ranking-navigation')) {
      document.querySelector('#ranking-navigation > div:nth-child(2)').innerHTML = 'Page ' + page + ' / ' + Math.ceil(size / 100);
      if (page === Math.ceil(size / 100)) {
        document.querySelector('#ranking-navigation > div:nth-child(1)').remove();
      }
    }
  }
}
