import {ChangeDetectorRef, inject, Injectable, OnDestroy} from '@angular/core';
import {collection, doc, docData, Firestore} from "@angular/fire/firestore";
import {DocumentData} from "@angular/fire/compat/firestore";
import {Subscriber, Subscription} from "rxjs";
import {LocalStorageService} from "../../local-storage-manager/service/local-storage.service";
import {LocalStorageKeys} from "../../../shared/model/local-storage/local-storage-keys";

@Injectable({
  providedIn: 'root'
})
export class ChangelogService implements OnDestroy {
  private firestore: Firestore = inject(Firestore);
  private localStorageService: LocalStorageService = inject(LocalStorageService);
  private configSubscription: Subscription;

  checkVersion(changeDetection: ChangeDetectorRef, changed: Subscriber<boolean>) {
    if (this.configSubscription) {
      return;
    }

    let configRef = collection(this.firestore, 'config');

    this.configSubscription = docData(
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
    });
  }

  ngOnDestroy() {
    this.configSubscription.unsubscribe();
  }
}
