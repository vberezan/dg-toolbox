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
      let orders: AllianceOrder[] = Object.assign([], items);
      let ordersListTable = document.getElementById('dgt-orders-list-table-' + idx).querySelector('tbody');

      // -- reset table
      ordersListTable.innerHTML = '';
      orders.forEach((order: AllianceOrder) => {
        let orderLine = document.createElement('tr');
        orderLine.innerHTML =
          '<td>' + order.target + '</td>' +
          '<td>' + order.wait + '</td>' +
          '<td>' + order.turn + '</td>' +
          '<td>' + order.comment + '</td>';

        ordersListTable.append(orderLine);
      });

    }).catch((error): void => {
      console.log(error);
    })
  }
}
