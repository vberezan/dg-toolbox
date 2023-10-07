import {ChangeDetectorRef, inject, Injectable} from '@angular/core';
import {AllianceOrder} from "../../../../shared/model/orders/alliance-order.model";
import {addDoc, collection, collectionData, deleteDoc, doc, Firestore, orderBy, query, where} from "@angular/fire/firestore";
import firebase from "firebase/compat";
import {Subscriber} from "rxjs";
import DocumentData = firebase.firestore.DocumentData;
import {DarkgalaxyApiService} from "../../../darkgalaxy-ui-parser/service/darkgalaxy-api.service";

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private firestore: Firestore = inject(Firestore);
  private dgApi: DarkgalaxyApiService = inject(DarkgalaxyApiService);

  updateOrder(order: AllianceOrder): void {
    order.from = this.dgApi.username(false);
    let ordersRef = collection(this.firestore, 'orders');

    addDoc(ordersRef, JSON.parse(JSON.stringify(order)))
      .catch((error): void => {
          console.log(error);
        }
      );
  }

  deleteOrder(id: string): void {
    deleteDoc(doc(collection(this.firestore, 'orders'), id))
      .catch((error): void => {
        console.log(error);
      });
  }

  getAllOrders(user: string, turn: number, changeDetection: ChangeDetectorRef, observer: Subscriber<AllianceOrder[]>): void {
    if (document.querySelector('dgt-alliance-orders-manager-panel .dgt-spinner-container.member')) {
      document.querySelectorAll('dgt-alliance-orders-manager-panel .dgt-spinner-container.member').forEach((spinner: Element): void => {
        spinner.classList.add('show');
        spinner.classList.remove('hide');
      });
    }

    let ordersRef = collection(this.firestore, 'orders');

    collectionData(
      query(ordersRef,
        where('user', '==', user),
        orderBy('executed', 'asc'),
        orderBy('wait', 'asc')
      ), {idField: 'id'}
    ).forEach((items: DocumentData[]) => {
      let orders: AllianceOrder[] = Object.assign([], items);

      orders.forEach((order: AllianceOrder) => {
        order.wait -= (turn - order.turn);
      })

      observer.next(orders);
      changeDetection.detectChanges();

      if (document.querySelector('dgt-alliance-orders-manager-panel .dgt-spinner-container.member')) {
        document.querySelectorAll('dgt-alliance-orders-manager-panel .dgt-spinner-container.member').forEach((spinner: Element): void => {
          spinner.classList.add('hide');
          spinner.classList.remove('show');
        });
      }
    }).catch((error): void => {
      console.log(error);
    });
  }
}
