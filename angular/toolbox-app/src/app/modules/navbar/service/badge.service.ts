import {ChangeDetectorRef, inject, Injectable} from '@angular/core';
import {collection, doc, docData, Firestore} from "@angular/fire/firestore";
import {Subscriber, Subscription} from "rxjs";
import {LocalStorageService} from "../../local-storage/local-storage-manager/service/local-storage.service";
import {LocalStorageKeys} from "../../../shared/model/local-storage/local-storage-keys";
import {DocumentData} from "@angular/fire/compat/firestore";

@Injectable({
  providedIn: 'root'
})
export class BadgeService {
  private firestore: Firestore = inject(Firestore);
  private localStorageService: LocalStorageService = inject(LocalStorageService);

  checkVersion(observer: Subscriber<boolean>, changeDetection: ChangeDetectorRef): void {
    let configRef: any = collection(this.firestore, 'config');

    let configSubscription: Subscription = docData(
      doc(configRef, 'version')
    ).subscribe((item: DocumentData): void => {
      let version: string = Object.assign({value: ''}, item).value;
      let localVersion: string = this.localStorageService.getVersion();

      if (localVersion !== version) {
        this.localStorageService.cache(LocalStorageKeys.UPDATE_AVAILABLE, true);
        observer.next(true);
      } else {
        this.localStorageService.cache(LocalStorageKeys.UPDATE_AVAILABLE, false);
        observer.next(false);
      }

      if (document.querySelector('.local-update-badge')) {
        document.querySelector<HTMLElement>('.local-update-badge').style.display = 'none';
      }

      changeDetection.detectChanges();
      configSubscription.unsubscribe();
    });
  }
}
