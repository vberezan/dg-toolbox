import {inject, Injectable} from '@angular/core';
import {collection, collectionData, Firestore, query, where} from "@angular/fire/firestore";
import firebase from "firebase/compat";
import DocumentData = firebase.firestore.DocumentData;

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
      callback(Object.assign([], items));
    });
  }
}
