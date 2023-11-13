import {inject, Injectable} from '@angular/core';
import {collection, doc, docData, Firestore} from "@angular/fire/firestore";
import {LocalStorageService} from "../../local-storage-manager/service/local-storage.service";
import {DocumentData} from "@angular/fire/compat/firestore";
import {LocalStorageKeys} from "../../../shared/model/local-storage/local-storage-keys";
import {Subscription} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GlobalConfigService {
  private firestore: Firestore = inject(Firestore);
  private localStorageService: LocalStorageService = inject(LocalStorageService);

  setStatsLastUpdateTurns(): void {
    let configRef: any = collection(this.firestore, 'config');

    let playerSubscription: Subscription = docData(
      doc(configRef, 'last-players-rankings-update-turn')
    ).subscribe((item: DocumentData): void => {
      this.localStorageService.cache(LocalStorageKeys.LAST_PLAYERS_RANKINGS_UPDATE_TURN, Object.assign({value: 0}, item).value);
      playerSubscription.unsubscribe();
    });

    let planetsSubscription: Subscription = docData(
      doc(configRef, 'last-planets-update-turn')
    ).subscribe((item: DocumentData): void => {
      this.localStorageService.cache(LocalStorageKeys.LAST_PLAYERS_RANKINGS_UPDATE_TURN, Object.assign({value: 0}, item).value);
      planetsSubscription.unsubscribe();
    });
  }
}
