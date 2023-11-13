import {EventEmitter, inject, Injectable} from '@angular/core';
import {collection, collectionData, Firestore, query, where} from "@angular/fire/firestore";
import {Subscription} from "rxjs";
import {DocumentData} from "@angular/fire/compat/firestore";
import {PlayerStats} from "../../../../shared/model/stats/player-stats.model";
import {AllianceMember} from "../../../../shared/model/alliances/alliance-member.model";
import {AllianceMemberStats} from "../../../../shared/model/alliances/alliance-member-stats.model";


@Injectable({
  providedIn: 'root'
})
export class StatsService {
  private firestore: Firestore = inject(Firestore);
  private _statsEventEmitter: EventEmitter<AllianceMemberStats> = new EventEmitter<AllianceMemberStats>();

  loadStats(allianceMembers: AllianceMember[]): void {
    const playersRef: any = collection(this.firestore, 'players');
    const names: string[] = allianceMembers.map((member: AllianceMember) => member.name.toLowerCase());

    let planetsSubscription: Subscription = collectionData(
      query(playersRef,
        where('name', 'in', names)
      )
    ).subscribe((items: DocumentData[]): void => {
      let players: PlayerStats[] = Object.assign([], items);

      players.forEach((playerStats: PlayerStats): void => {
        let stats: AllianceMemberStats = new AllianceMemberStats();
        stats.name = playerStats.name;
        stats.score = playerStats.score;
        stats.combatScore = playerStats.combatScore;
        stats.rank = playerStats.rank;
        stats.planets = playerStats.planets.length;

        this._statsEventEmitter.emit(stats);
      });
    });

    planetsSubscription.unsubscribe();
  }


  get statsEventEmitter(): EventEmitter<AllianceMemberStats> {
    return this._statsEventEmitter;
  }
}

