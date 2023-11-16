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
    const localVersion: string = this.localStorageService.get(LocalStorageKeys.LOCAL_VERSION);
    const remoteVersion: string = this.localStorageService.get(LocalStorageKeys.REMOTE_VERSION);
    const config: any = collection(this.firestore, 'config');

    if (remoteVersion == null) {
      console.log('loaded remote version');
      let subscription: Subscription = docData(
        doc(config, 'version')
      ).subscribe((item: DocumentData): void => {
        let newVersion: string = Object.assign({value: ''}, item).value + Math.random();

        this.localStorageService.cache(LocalStorageKeys.REMOTE_VERSION, newVersion, 10000);

        if (newVersion !== localVersion) {
          this.localStorageService.cache(LocalStorageKeys.UPDATE_AVAILABLE, true);
        } else {
          this.localStorageService.cache(LocalStorageKeys.UPDATE_AVAILABLE, false);
        }

        subscription.unsubscribe();
      });
    }
  }
}
