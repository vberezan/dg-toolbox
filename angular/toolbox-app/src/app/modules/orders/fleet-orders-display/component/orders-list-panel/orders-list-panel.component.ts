import {Component, inject, OnInit} from '@angular/core';
import {OrderService} from "../../service/order.service";
import {DarkgalaxyApiService} from "../../../../darkgalaxy-ui-parser/service/darkgalaxy-api.service";
import {AllianceOrder} from "../../../../../model/orders/alliance-order.model";

@Component({
  selector: 'dgt-fleet-orders-list-panel',
  templateUrl: './orders-list-panel.component.html',
  styleUrls: ['./orders-list-panel.component.css']
})
export class OrdersListPanelComponent implements OnInit {
  private orderService: OrderService = inject(OrderService);
  private dgAPI: DarkgalaxyApiService = inject(DarkgalaxyApiService);
  protected orders: Promise<AllianceOrder[]>;

  constructor() {
    this.orders = new Promise<AllianceOrder[]>((resolve, reject) => {
      this.orderService.getOrders(this.dgAPI.getUser(), resolve);
    });
  }

  ngOnInit(): void {
  }


}
