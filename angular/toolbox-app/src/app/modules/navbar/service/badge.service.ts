import {ChangeDetectorRef, inject, Injectable, OnDestroy} from '@angular/core';
import {collection, collectionData, Firestore, query, where} from "@angular/fire/firestore";
import {Subscriber, Subscription} from "rxjs";
import firebase from "firebase/compat";
import DocumentData = firebase.firestore.DocumentData;
import {LocalStorageService} from "../../local-storage-manager/service/local-storage.service";
import {LocalStorageKeys} from "../../../shared/model/local-storage/local-storage-keys";

@Injectable({
  providedIn: 'root'
})
export class BadgeService implements OnDestroy {
  private firestore: Firestore = inject(Firestore);
  private localStorageService: LocalStorageService = inject(LocalStorageService);
  private ordersSubscription: Subscription;

  subscribeToFleetOrders(user: string, observer: Subscriber<number>, changeDetection: ChangeDetectorRef): void {
    if (this.ordersSubscription != null) {
      return;
    }
    let ordersRef: any = collection(this.firestore, 'orders');

    this.ordersSubscription = collectionData<DocumentData, string>(
      query(ordersRef,
        where('user', '==', user),
        where('executed', '==', false)
      ), {idField: 'id'}
    ).subscribe((items: DocumentData[]): void => {
      console.log(items.length);

      observer.next(items.length);

      if (items.length > 0 ) {
        this.localStorageService.cache(LocalStorageKeys.ACTIVE_ORDERS, items.length);
      } else {
        this.localStorageService.remove(LocalStorageKeys.ACTIVE_ORDERS);
      }

      changeDetection.detectChanges();

      if (document.querySelector('.local-orders-badge')) {
        document.querySelector<HTMLElement>('.local-orders-badge').style.display = 'none';
      }
    });
  }

  ngOnDestroy(): void {
    this.ordersSubscription.unsubscribe();
  }
}
