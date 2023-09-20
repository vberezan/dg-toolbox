import { Injectable } from '@angular/core';
import {AllianceOrder} from "../../../../model/orders/alliance-order.model";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  updateOrder(order: AllianceOrder): void {
    console.log(order);
  }
}
