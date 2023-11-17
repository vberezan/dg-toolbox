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


  constructor() {
  }

  loadTurnBasedUpdates(turn: number): void {

  }

  loadLiveUpdates(): void {
    this.loadVersion();
  }

  private loadVersion(): void {
    const remoteVersion: string = this.localStorageService.get(LocalStorageKeys.REMOTE_VERSION);
    const config: any = collection(this.firestore, 'config');

    if (remoteVersion == null) {
      let subscription: Subscription = docData(
        doc(config, 'versionv2')
      ).subscribe((item: DocumentData): void => {
        let newVersion: string = Object.assign({value: ''}, item).value;

        this.localStorageService.cache(LocalStorageKeys.REMOTE_VERSION, newVersion, 300000);

        subscription.unsubscribe();
      });
    }
  }
}
