import {Component, inject} from '@angular/core';
import {OrderService} from "../../service/order.service";

@Component({
  selector: 'dgt-fleet-orders-list-panel',
  templateUrl: './orders-list-panel.component.html',
  styleUrls: ['./orders-list-panel.component.css']
})
export class OrdersListPanelComponent {
  private orderService: OrderService = inject(OrderService);

}
