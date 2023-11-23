import {inject, Injectable} from '@angular/core';
import {DarkgalaxyApiService} from "../../../darkgalaxy-ui-parser/service/darkgalaxy-api.service";
import {PlayerStats} from "../../../../shared/model/stats/player-stats.model";
import {LocalStorageKeys} from "../../../../shared/model/local-storage/local-storage-keys";
import {LocalStorageService} from "../../../local-storage/local-storage-manager/service/local-storage.service";
import {AllianceMember} from "../../../../shared/model/alliances/alliance-member.model";

@Injectable({
  providedIn: 'root'
})
export class PlayerRankingsService {
  private dgApi: DarkgalaxyApiService = inject(DarkgalaxyApiService);
  private localStorageService: LocalStorageService = inject(LocalStorageService);

  constructor() { }

  fetchAndClear(): Map<number, PlayerStats> {
    let rankings: Map<number, PlayerStats> = new Map<number, PlayerStats>();

    const cachedStats: PlayerStats[] = this.localStorageService.get(LocalStorageKeys.PLAYERS_STATS);

    for (let i: number = 0; i < cachedStats.length - 1; i++) {
      for (let j: number = i + 1; j < cachedStats.length; j++) {
          if (cachedStats[i].score < cachedStats[j].score) {

          const aux: PlayerStats = cachedStats[i];
            cachedStats[i] = cachedStats[j];
            cachedStats[j] = aux;
        }
      }
    }

    for (let i: number = 0; i < cachedStats.length; i++) {
      rankings.set(cachedStats[i].playerId, cachedStats[i]);
    }

    document.querySelector('.playerRankingsList').remove();

    return rankings;
  }

  orderBy(key: string, order: string, page: number, pageSize: number): Map<number, PlayerStats> {
    let orderedRankings: Map<number, PlayerStats> = new Map<number, PlayerStats>();
    const cachedStats: PlayerStats[] = this.localStorageService.get(LocalStorageKeys.PLAYERS_STATS);

    for (let i: number = 0; i < cachedStats.length - 1; i++) {
      for (let j: number = i + 1; j < cachedStats.length; j++) {
        let sortCondition: boolean = false;

        switch (key) {
          case 'score':
          case 'planets':
          case 'g1Total':
          case 'g213Total':
          case 'g1449Total':
            if (order === 'desc') {
              cachedStats[i][key] < cachedStats[j][key] ? sortCondition = true : sortCondition = false;
            }

            if (order === 'asc') {
              cachedStats[i][key] > cachedStats[j][key] ? sortCondition = true : sortCondition = false;
            }
            break;
          case 'scorePerPlanet':
            if (order === 'desc') {
              cachedStats[i].score / cachedStats[i].planets < cachedStats[j].score / cachedStats[j].planets ? sortCondition = true : sortCondition = false;
            } else {
              cachedStats[i].score / cachedStats[i].planets > cachedStats[j].score / cachedStats[j].planets ? sortCondition = true : sortCondition = false;
            }
            break;
          default:
            break;
        }

        if (sortCondition) {
          const aux: PlayerStats = cachedStats[i];
          cachedStats[i] = cachedStats[j];
          cachedStats[j] = aux;
        }
      }
    }

    if (cachedStats.length > pageSize * page) {
      for (let i: number = pageSize * (page - 1); i < pageSize * page; i++) {
        orderedRankings.set(cachedStats[i].playerId, cachedStats[i]);
      }
    } else {
      for (let i: number = cachedStats.length - 100; i < cachedStats.length; i++) {
        orderedRankings.set(cachedStats[i].playerId, cachedStats[i]);
      }
    }

    return orderedRankings;
  }

}
