import {ChangeDetectorRef, inject, Injectable} from '@angular/core';
import {collection, collectionData, Firestore, query, where} from "@angular/fire/firestore";
import firebase from "firebase/compat";
import {Subscriber} from "rxjs";
import {AllianceOrder} from "../../../../model/orders/alliance-order.model";
import DocumentData = firebase.firestore.DocumentData;

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private firestore: Firestore = inject(Firestore);

  getOrders(user: string, observer: Subscriber<AllianceOrder[]>, changeDetection: ChangeDetectorRef, hideComponent: boolean): void {
    let ordersRef = collection(this.firestore, 'orders');

    collectionData(
      query(ordersRef,
        where('user', '==', user)
      ), {idField: 'id'}
    ).subscribe((items: DocumentData[]) => {
      observer.next(Object.assign([], items));
      hideComponent = (items.length == 0);
      changeDetection.detectChanges();
    });
  }
}
