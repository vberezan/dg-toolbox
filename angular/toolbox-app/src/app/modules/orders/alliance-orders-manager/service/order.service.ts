import {ChangeDetectorRef, inject, Injectable} from '@angular/core';
import {AllianceOrder} from "../../../../shared/model/orders/alliance-order.model";
import {addDoc, collection, collectionData, deleteDoc, doc, Firestore, orderBy, query, where} from "@angular/fire/firestore";
import firebase from "firebase/compat";
import {Subscriber} from "rxjs";
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

  deleteOrder(id: string): void {
    deleteDoc(doc(collection(this.firestore, 'orders'), id))
      .catch((error) => {
        console.log(error);
      });
  }

  getAllOrders(user: string, turn: number, changeDetection: ChangeDetectorRef, observer: Subscriber<AllianceOrder[]>): void {
    let ordersRef = collection(this.firestore, 'orders');

    collectionData(
      query(ordersRef,
        where('user', '==', user),
        orderBy('executed', 'asc')
      ), {idField: 'id'}
    ).forEach((items: DocumentData[]) => {
      let orders: AllianceOrder[] = Object.assign([], items);

      orders.forEach((order: AllianceOrder) => {
        order.wait -= (turn - order.turn);
      })

      observer.next(orders);
      changeDetection.detectChanges();
    }).catch((error) => {
      console.log(error);
    });
  }

  private status(executed: boolean): string {
    switch (executed) {
      case true:
        return '<svg style="fill: #7BBD1A; height: 11px; vertical-align: middle; align-content: center; display: inline-flex;" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z"/></svg><span>sent</span>';
      case false:
        return '<svg style="fill: #ff8484; height: 11px; vertical-align: middle; align-content: center; display: inline-flex;" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z"/></svg><span>not sent</span>';
      default:
        return '';
    }
  }
}
