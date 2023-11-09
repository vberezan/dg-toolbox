import {ChangeDetectorRef, inject, Injectable, OnDestroy} from '@angular/core';
import {AllianceOrder} from "../../../../shared/model/orders/alliance-order.model";
import {addDoc, collection, collectionData, deleteDoc, doc, Firestore, orderBy, query, where} from "@angular/fire/firestore";
import firebase from "firebase/compat";
import {Subscriber, Subscription} from "rxjs";
import {DarkgalaxyApiService} from "../../../darkgalaxy-ui-parser/service/darkgalaxy-api.service";
import DocumentData = firebase.firestore.DocumentData;

@Injectable({
  providedIn: 'root'
})
export class OrderService implements OnDestroy {
  private firestore: Firestore = inject(Firestore);
  private dgApi: DarkgalaxyApiService = inject(DarkgalaxyApiService);
  private ordersSubscriptions: Map<String, Subscription> = new Map<String, Subscription>();

  updateOrder(order: AllianceOrder): void {
    order.from = this.dgApi.username(false);
    let ordersRef = collection(this.firestore, 'orders');

    addDoc(ordersRef, JSON.parse(JSON.stringify(order)))
      .catch((error): void => {
        console.log(error);
      });
  }

  deleteOrder(id: string): void {
    deleteDoc(doc(collection(this.firestore, 'orders'), id))
      .catch((error): void => {
        console.log(error);
      });
  }

  getAllOrders(user: string, turn: number, changeDetection: ChangeDetectorRef, observer: Subscriber<AllianceOrder[]>): void {
    if (this.ordersSubscriptions.has(user)) {
      return;
    }

    if (document.querySelector('dgt-alliance-orders-manager-panel .dgt-spinner-container.member')) {
      document.querySelectorAll('dgt-alliance-orders-manager-panel .dgt-spinner-container.member').forEach((spinner: Element): void => {
        spinner.classList.add('show');
        spinner.classList.remove('hide');
      });
    }

    let ordersRef: any = collection(this.firestore, 'orders');

    this.ordersSubscriptions.set(
      user,
      collectionData<DocumentData, string>(
        query(ordersRef,
          where('user', '==', user),
          orderBy('executed', 'asc'),
          orderBy('wait', 'asc')
        ), {idField: 'id'}
      ).subscribe((items: DocumentData[]) => {
        let orders: AllianceOrder[] = Object.assign([], items);

        orders.forEach((order: AllianceOrder) => {
          order.wait -= (turn - order.turn);
        })

        observer.next(orders);

        if (document.querySelector('dgt-alliance-orders-manager-panel .dgt-spinner-container.member')) {
          document.querySelectorAll('dgt-alliance-orders-manager-panel .dgt-spinner-container.member').forEach((spinner: Element): void => {
            spinner.classList.add('hide');
            spinner.classList.remove('show');
          });
        }

        changeDetection.detectChanges();
      })
    );
  }

  ngOnDestroy() {
    this.ordersSubscriptions.forEach((subscription: Subscription): void => {
      subscription.unsubscribe();
    });
  }
}
