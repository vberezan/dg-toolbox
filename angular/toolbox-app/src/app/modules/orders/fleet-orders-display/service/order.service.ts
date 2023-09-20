import {inject, Injectable} from '@angular/core';
import {collection, collectionData, Firestore, query, where} from "@angular/fire/firestore";
import firebase from "firebase/compat";
import DocumentData = firebase.firestore.DocumentData;
import {AllianceOrder} from "../../../../model/orders/alliance-order.model";

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private firestore: Firestore = inject(Firestore);

  getOrders(user: string, callback: Function): void {
    let ordersRef = collection(this.firestore, 'orders');

    collectionData(
      query(ordersRef,
        where('user', '==', user)
      ), {idField: 'id'}
    ).subscribe((items: DocumentData[]) => {
      console.log(items);

      let result: AllianceOrder[] = [];
      items.forEach((item: DocumentData) => {
        result.push(item as AllianceOrder);
      });

      callback(Object.assign([], result));
    });
  }
}
