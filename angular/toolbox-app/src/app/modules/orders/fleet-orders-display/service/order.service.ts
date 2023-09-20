import {inject, Injectable} from '@angular/core';
import {collection, collectionData, Firestore, query, where} from "@angular/fire/firestore";
import {AllianceOrder} from "../../../../model/orders/alliance-order.model";
import firebase from "firebase/compat";
import DocumentData = firebase.firestore.DocumentData;

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private firestore: Firestore = inject(Firestore);

  fillOrders(user: string): void {
    let ordersRef = collection(this.firestore, 'orders');

    console.log(user);

    collectionData(
      query(ordersRef,
        where('user', '==', user)
      ), {idField: 'id'}
    ).forEach((items: DocumentData[]) => {
      let orders: AllianceOrder[] = Object.assign([], items);

      console.log(orders);
    }).catch((error) => {
      console.log(error);
    })
  }
}
