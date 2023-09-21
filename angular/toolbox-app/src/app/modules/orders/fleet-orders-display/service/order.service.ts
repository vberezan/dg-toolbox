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

  getOrders(user: string, turn: number, observer: Subscriber<AllianceOrder[]>, changeDetection: ChangeDetectorRef): void {
    let ordersRef = collection(this.firestore, 'orders');

    collectionData(
      query(ordersRef,
        where('user', '==', user)
      ), {idField: 'id'}
    ).forEach((items: DocumentData[]) => {
      let orders: AllianceOrder[] = Object.assign([], items);


      orders.forEach((order) => {
        order.wait -= (turn - order.turn);

        console.log(order.id);
      })

      observer.next(orders);
      changeDetection.detectChanges();
    }).catch((error) => {
      console.log(error);
    });
  }
}
