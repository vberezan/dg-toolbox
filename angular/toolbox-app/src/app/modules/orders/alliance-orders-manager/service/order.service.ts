import {inject, Injectable} from '@angular/core';
import {AllianceOrder} from "../../../../model/orders/alliance-order.model";
import {addDoc, collection, collectionData, Firestore, query, where} from "@angular/fire/firestore";
import firebase from "firebase/compat";
import DocumentData = firebase.firestore.DocumentData;

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private firestore: Firestore = inject(Firestore);

  updateOrder(order: AllianceOrder): void {
    let ordersRef = collection(this.firestore, 'orders');

    addDoc(ordersRef, JSON.parse(JSON.stringify(order)))
      .catch((error): void => {
          console.log(error);
        }
      );
  }

  fillActiveOrders(user: string, idx: number): void {
    let ordersRef = collection(this.firestore, 'orders');

    collectionData(
      query(ordersRef,
        where('user', '==', user)
      ), {idField: 'id'}
    ).forEach((items: DocumentData[]) => {
      console.log(items);
    }).catch((error): void => {
      console.log(error);
    })
  }
}
