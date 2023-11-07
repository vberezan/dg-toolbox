import {ChangeDetectorRef, inject, Injectable} from '@angular/core';
import {collection, collectionData, Firestore, query, where} from "@angular/fire/firestore";
import {Subscriber} from "rxjs";
import firebase from "firebase/compat";
import DocumentData = firebase.firestore.DocumentData;
import {LocalStorageService} from "../../local-storage-manager/service/local-storage.service";
import {LocalStorageKeys} from "../../../shared/model/local-storage/local-storage-keys";

@Injectable({
  providedIn: 'root'
})
export class BadgeService {
  private firestore: Firestore = inject(Firestore);
  private localStorageService: LocalStorageService = inject(LocalStorageService);

  subscribeToFleetOrders(user: string, observer: Subscriber<number>, changeDetection: ChangeDetectorRef) {
    let ordersRef = collection(this.firestore, 'orders');

    console.log('inauntru 1');

    collectionData<DocumentData, string>(
      query(ordersRef,
        where('user', '==', user),
        where('executed', '==', false)
      ), {idField: 'id'}
    ).forEach((items: DocumentData[]): void => {
      console.log('inauntru 2');

      observer.next(items.length);

      console.log('inauntru 3');

      if (items.length > 0 ) {
        this.localStorageService.cache(LocalStorageKeys.ACTIVE_ORDERS, items.length);
      } else {
        this.localStorageService.remove(LocalStorageKeys.ACTIVE_ORDERS);
      }

      console.log('inauntru 4');

      changeDetection.detectChanges();

      console.log('inauntru 5');

      if (document.querySelector('.local-orders-badge')) {
        document.querySelector<HTMLElement>('.local-orders-badge').style.display = 'none';
      }
    }).catch((error) => {
      console.log(error);
    });
  }
}
