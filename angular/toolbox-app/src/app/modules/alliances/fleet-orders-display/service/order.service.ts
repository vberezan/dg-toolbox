import {ChangeDetectorRef, inject, Injectable} from '@angular/core';
import {collection, collectionData, doc, Firestore, orderBy, query, updateDoc, where} from "@angular/fire/firestore";
import firebase from "firebase/compat";
import {Subscriber, Subscription} from "rxjs";
import {AllianceOrder} from "../../../../shared/model/orders/alliance-order.model";
import DocumentData = firebase.firestore.DocumentData;

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private firestore: Firestore = inject(Firestore);
  private ordersSubscription: Subscription;

  getActiveOrders(user: string, turn: number, changeDetection: ChangeDetectorRef, observer: Subscriber<AllianceOrder[]>): void {
    if (this.ordersSubscription) {
      return;
    }

    let ordersRef = collection(this.firestore, 'orders');

    this.ordersSubscription = collectionData<DocumentData, string>(
      query(ordersRef,
        where('user', '==', user),
        where('executed', '==', false),
        orderBy('executed', 'asc'),
        orderBy('wait', 'asc')
      ), {idField: 'id'}
    ).subscribe((items: DocumentData[]): void => {
      let orders: AllianceOrder[] = Object.assign([], items);

      orders.forEach((order) => {
        order.wait -= (turn - order.turn);
      })

      observer.next(orders);
      changeDetection.detectChanges();

      if (document.querySelector('dgt-fleet-orders-list-panel .dgt-spinner-container')) {
        document.querySelector('dgt-fleet-orders-list-panel .dgt-spinner-container').classList.add('hide');
        document.querySelector('dgt-fleet-orders-list-panel .dgt-spinner-container').classList.remove('show');
      }
    });
  }

  completeOrder(id: string) {
    let ordersRef = collection(this.firestore, 'orders');

    updateDoc(doc(ordersRef, id), {'executed': true}).catch((error): void => {
      console.log(error);
    });
  }
}
