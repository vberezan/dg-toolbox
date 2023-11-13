import {ChangeDetectorRef, inject, Injectable} from '@angular/core';
import {collection, doc, docData, Firestore} from "@angular/fire/firestore";
import {DocumentData} from "@angular/fire/compat/firestore";
import {Subscriber, Subscription} from "rxjs";
import {LocalStorageService} from "../../local-storage-manager/service/local-storage.service";
import {LocalStorageKeys} from "../../../shared/model/local-storage/local-storage-keys";

@Injectable({
  providedIn: 'root'
})
export class ChangelogService {
  private firestore: Firestore = inject(Firestore);
  private localStorageService: LocalStorageService = inject(LocalStorageService);

  checkVersion(changeDetection: ChangeDetectorRef, changed: Subscriber<boolean>): void {
    let configRef: any = collection(this.firestore, 'config');

    let configSubscription: Subscription = docData(
      doc(configRef, 'version')
    ).subscribe((item: DocumentData): void => {
      let version: string = Object.assign({value: ''}, item).value;
      let localVersion: string = this.localStorageService.getVersion();

      if (localVersion !== version) {
        this.localStorageService.cache(LocalStorageKeys.UPDATE_AVAILABLE, true);
        changed.next(true);
      } else {
        this.localStorageService.cache(LocalStorageKeys.UPDATE_AVAILABLE, false);
        changed.next(false);
      }

      changed.complete();

      changeDetection.detectChanges();
      if (document.querySelector('dgt-changelog .dgt-spinner-container')) {
        document.querySelector('dgt-changelog .dgt-spinner-container').classList.add('hide');
        document.querySelector('dgt-changelog .dgt-spinner-container').classList.remove('show');
      }

      configSubscription.unsubscribe();
    });
  }
}
