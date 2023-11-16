import {inject, Injectable} from '@angular/core';
import {collection, doc, docData, Firestore} from "@angular/fire/firestore";
import {LocalStorageService} from "../../local-storage-manager/service/local-storage.service";
import {Subscription} from "rxjs";
import {DocumentData} from "@angular/fire/compat/firestore";
import {LocalStorageKeys} from "../../../../shared/model/local-storage/local-storage-keys";

@Injectable({
  providedIn: 'root'
})
export class SynchronizerService {
  private firestore: Firestore = inject(Firestore);
  private localStorageService: LocalStorageService = inject(LocalStorageService);


  constructor() { }

  loadTurnBasedUpdates(turn: number): void {

  }

  loadLiveUpdates(): void {
    this.loadVersion();
  }

  private loadVersion(): void {
    const version: string = this.localStorageService.get(LocalStorageKeys.VERSION);
    const config: any = collection(this.firestore, 'config');

    // if (version == null) {
    //   let subscription: Subscription = docData(
    //     doc(config, 'version')
    //   ).subscribe((item: DocumentData): void => {
    //     let newVersion: string = Object.assign({value: ''}, item).value + Math.random();
    //
    //     if (newVersion !== version) {
    //       this.localStorageService.cache(LocalStorageKeys.UPDATE_AVAILABLE, true);
    //       this.localStorageService.cache(LocalStorageKeys.VERSION, newVersion, 300000);
    //     } else {
    //       this.localStorageService.cache(LocalStorageKeys.UPDATE_AVAILABLE, false);
    //     }
    //
    //     subscription.unsubscribe();
    //   });
    // }
  }
}
