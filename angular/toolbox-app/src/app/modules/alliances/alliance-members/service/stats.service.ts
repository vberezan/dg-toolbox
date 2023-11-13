import {EventEmitter, inject, Injectable} from '@angular/core';
import {collection, collectionData, Firestore, query, where} from "@angular/fire/firestore";
import {Subscription} from "rxjs";
import {DocumentData} from "@angular/fire/compat/firestore";
import {PlayerStats} from "../../../../shared/model/stats/player-stats.model";
import {AllianceMember} from "../../../../shared/model/orders/alliance-member.model";


@Injectable({
  providedIn: 'root'
})
export class StatsService {
  private firestore: Firestore = inject(Firestore);
  private _statsEventEmitter: EventEmitter<{ 'name': string, 'score': number, 'combatScore': number, 'rank': number, 'planets': number }>
    = new EventEmitter<{
    'name': string,
    'score': number,
    'combatScore': number,
    'rank': number,
    'planets': number
  }>();

  loadStats(allianceMembers: AllianceMember[]): void {
    const playersRef: any = collection(this.firestore, 'players');
    const names: string[] = allianceMembers.map((member: AllianceMember) => member.name.toLowerCase());

    let planetsSubscription: Subscription = collectionData(
      query(playersRef,
        where('name', 'in', names)
      )
    ).subscribe((items: DocumentData[]): void => {
      let players: PlayerStats[] = Object.assign([], items);

      players.forEach((playerStats: PlayerStats) => {
        this.statsEventEmitter.emit({
          'name': playerStats.name,
          'score': playerStats.score,
          'combatScore': playerStats.combatScore,
          'rank': playerStats.rank,
          'planets': playerStats.planets.length
        });
      });

      planetsSubscription.unsubscribe();
    });
  }


  get statsEventEmitter(): EventEmitter<{ 'name': string, score: number; "combatScore": number; "rank": number; planets: number }> {
    return this._statsEventEmitter;
  }
}
