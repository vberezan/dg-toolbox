import {inject, Injectable} from '@angular/core';
import {AllianceOrder} from "../../../../model/orders/alliance-order.model";
import {addDoc, collection, Firestore} from "@angular/fire/firestore";

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
}
