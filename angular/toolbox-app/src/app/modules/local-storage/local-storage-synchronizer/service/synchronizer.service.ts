import {inject, Injectable} from '@angular/core';
import {collection, collectionData, doc, docData, Firestore} from "@angular/fire/firestore";
import {LocalStorageService} from "../../local-storage-manager/service/local-storage.service";
import {Subscription} from "rxjs";
import {DocumentData} from "@angular/fire/compat/firestore";
import {LocalStorageKeys} from "../../../../shared/model/local-storage/local-storage-keys";
import {PlayerStats} from "../../../../shared/model/stats/player-stats.model";

@Injectable({
  providedIn: 'root'
})
export class SynchronizerService {
  private firestore: Firestore = inject(Firestore);
  private localStorageService: LocalStorageService = inject(LocalStorageService);


  constructor() {
  }

  loadTurnBasedUpdates(turn: number): void {
    console.log(turn);

    if (this.localStorageService.get(LocalStorageKeys.PLAYERS_STATS) == null ||
      this.localStorageService.get(LocalStorageKeys.LAST_PLAYERS_RANKINGS_UPDATE_TURN) == null ||
      turn > this.localStorageService.get(LocalStorageKeys.LAST_PLAYERS_RANKINGS_UPDATE_TURN)) {

      this.loadPlayersRankings(turn);
    }
  }

  loadLiveUpdates(): void {
    this.loadVersion();
  }

  private loadVersion(): void {
    const collectionPath: any = collection(this.firestore, 'config');
    const documentPath: string = 'version';

    if (this.localStorageService.isExpired(LocalStorageKeys.REMOTE_VERSION)) {
      let subscription: Subscription = docData(
        doc(collectionPath, documentPath)
      ).subscribe((item: DocumentData): void => {
        this.localStorageService.cache(LocalStorageKeys.REMOTE_VERSION, Object.assign({value: ''}, item).value, 300000);
        subscription.unsubscribe();
      });
    }
  }

  private loadPlayersRankings(turn: number): void {
    const collectionPath: any = collection(this.firestore, 'players-rankings');


    let subscription: Subscription = collectionData(collectionPath)
      .subscribe((items: DocumentData[]): void => {
        let playerStats: PlayerStats[] = Object.assign([], items);


        this.localStorageService.cache(LocalStorageKeys.PLAYERS_STATS, playerStats);
        this.localStorageService.cache(LocalStorageKeys.LAST_PLAYERS_RANKINGS_UPDATE_TURN, turn);
        subscription.unsubscribe();
      });
  }
}
