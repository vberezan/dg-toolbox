import {ChangeDetectorRef, inject, Injectable} from '@angular/core';
import {collection, doc, docData, Firestore} from "@angular/fire/firestore";
import {DocumentData} from "@angular/fire/compat/firestore";
import {Subscriber} from "rxjs";
import {LocalStorageService} from "../../local-storage-manager/service/local-storage.service";

@Injectable({
  providedIn: 'root'
})
export class ChangelogService {
  private firestore: Firestore = inject(Firestore);
  private localStorageService: LocalStorageService = inject(LocalStorageService);

  checkVersion(changeDetection: ChangeDetectorRef, changed: Subscriber<boolean>) {
    let configRef = collection(this.firestore, 'config');

    docData(doc(configRef, 'version')
    ).forEach((item: DocumentData): void => {
      let version: string = Object.assign({value: ''}, item).value;
      let localVersion: string = this.localStorageService.getVersion();

      if (localVersion !== version) {
        changed.next(true);
      } else {
        changed.next(false);
      }

      changed.complete();

      changeDetection.detectChanges();
      if (document.querySelector('dgt-changelog .dgt-spinner-container')) {
        document.querySelector('dgt-changelog .dgt-spinner-container').classList.add('hide');
        document.querySelector('dgt-changelog .dgt-spinner-container').classList.remove('show');
      }
    }).catch((error) => {
      console.log(error);
    });

  }
}
