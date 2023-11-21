import { Injectable } from '@angular/core';
import {DataExtractor} from "./data-extractor";
import {PlayerStats} from "../../../shared/model/stats/player-stats.model";

@Injectable({
  providedIn: 'platform'
})
export class PlayerRankingsService implements DataExtractor{

  constructor() { }

  cleanAfterExtract(): void {
  }

  extract(): Map<number, PlayerStats> {
    let playersStats: Map<number, PlayerStats> = new Map<number, PlayerStats>();

    document.querySelectorAll('.rankingsList .entry').forEach((row: any): void => {
      const playerId: number = parseInt(row.querySelector('.playerName').attributes['playerId'].value.trim());

      if (!playersStats.has(playerId)) {
        playersStats.set(playerId, new PlayerStats());
      }

      let player: PlayerStats = playersStats.get(playerId);

      player.name = row.querySelector('.playerName').textContent.trim().toLowerCase();
      player.playerId = playerId;
      player.score = parseInt(row.querySelector('.score').textContent.trim().replace(/,/g, ''));
      player.rank = parseInt(row.querySelector('.rank').textContent.trim().replace(/,/g, ''));
      player.combinedScore = player.combatScore + player.score;
      if (row.querySelector('.allianceName')) {
        player.alliance = row.querySelector('.allianceName').textContent.trim().toLowerCase().replace(/\[/g, '').replace(/]/g, '');
      } else {
        player.alliance = '-';
      }

      if (row.classList.contains('myRow')) {
        player.relation = 'allied';
      } else if (row.querySelector('.hostile')) {
        player.relation = 'neutral';
      } else if (row.querySelector('.allied')) {
        player.relation = 'allied';
      }

      if (player.alliance === 'sol') {
        player.relation = 'nap';
      }

      if (player.alliance === 'wp' || player.alliance === 'skol') {
        player.relation = 'hostile';
      }
    });

    return playersStats;
  }
}
