import {ChangeDetectorRef, EventEmitter, inject, Injectable, OnDestroy} from '@angular/core';
import {collection, collectionData, doc, docData, Firestore, query, where} from "@angular/fire/firestore";
import {Subscriber, Subscription} from "rxjs";
import {LocalStorageService} from "../../local-storage-manager/service/local-storage.service";
import {LocalStorageKeys} from "../../../shared/model/local-storage/local-storage-keys";
import {DocumentData} from "@angular/fire/compat/firestore";

@Injectable({
  providedIn: 'root'
})
export class BadgeService implements OnDestroy {
  private firestore: Firestore = inject(Firestore);
  private localStorageService: LocalStorageService = inject(LocalStorageService);
  private ordersSubscription: Subscription;
  private configSubscription: Subscription;

  checkFleetOrders(user: string, observer: Subscriber<number>, changeDetection: ChangeDetectorRef): void {
    if (this.ordersSubscription) {
      return;
    }

    let ordersRef: any = collection(this.firestore, 'orders');

    this.ordersSubscription = collectionData<DocumentData, string>(
      query(ordersRef,
        where('user', '==', user),
        where('executed', '==', false)
      ), {idField: 'id'}
    ).subscribe((items: DocumentData[]): void => {
      observer.next(items.length);

      if (items.length > 0) {
        this.localStorageService.cache(LocalStorageKeys.ACTIVE_ORDERS, items.length);
      } else {
        this.localStorageService.remove(LocalStorageKeys.ACTIVE_ORDERS);
      }

      if (document.querySelector('.local-orders-badge')) {
        document.querySelector<HTMLElement>('.local-orders-badge').style.display = 'none';
      }

      changeDetection.detectChanges();
    });
  }


  checkVersion(observer: Subscriber<boolean>, changeDetection: ChangeDetectorRef): void {
    if (this.configSubscription) {
      return;
    }

    let configRef: any = collection(this.firestore, 'config');

    this.configSubscription = docData(
      doc(configRef, 'version')
    ).subscribe((item: DocumentData): void => {
      console.log(Math.random());

      let version: string = Object.assign({value: ''}, item).value;
      let localVersion: string = this.localStorageService.getVersion();

      if (localVersion !== version) {
        observer.next(true);
      } else {
        observer.next(false);
      }

      changeDetection.detectChanges();
    });
  }

  ngOnDestroy(): void {
    this.ordersSubscription.unsubscribe();
  }
}
