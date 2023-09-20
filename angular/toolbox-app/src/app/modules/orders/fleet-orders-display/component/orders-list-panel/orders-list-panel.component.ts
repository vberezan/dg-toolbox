import {ChangeDetectorRef, Component, inject, OnInit} from '@angular/core';
import {OrderService} from "../../service/order.service";
import {DarkgalaxyApiService} from "../../../../darkgalaxy-ui-parser/service/darkgalaxy-api.service";
import {AllianceOrder} from "../../../../../model/orders/alliance-order.model";
import {Observable, Subscriber} from "rxjs";

@Component({
  selector: 'dgt-fleet-orders-list-panel',
  templateUrl: './orders-list-panel.component.html',
  styleUrls: ['./orders-list-panel.component.css']
})
export class OrdersListPanelComponent implements OnInit {
  private orderService: OrderService = inject(OrderService);
  private dgAPI: DarkgalaxyApiService = inject(DarkgalaxyApiService);
  private changeDetection: ChangeDetectorRef = inject(ChangeDetectorRef);
  public orders: Observable<AllianceOrder[]>;
  public hideComponent: boolean = true;

  constructor() {
    this.orders = new Observable<AllianceOrder[]>((observer: Subscriber<AllianceOrder[]>) => {
      this.orderService.getOrders(this.dgAPI.getUser(), observer, this.changeDetection, this.hideComponent);
    });
  }

  ngOnInit(): void {
  }
}