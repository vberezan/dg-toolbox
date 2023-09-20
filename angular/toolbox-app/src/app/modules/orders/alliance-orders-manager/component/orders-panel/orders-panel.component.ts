import {Component, inject, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {OrderService} from "../../service/order.service";
import {AllianceOrder} from "../../../../../model/orders/alliance-order.model";
import {DarkgalaxyApiService} from "../../../../darkgalaxy-ui-parser/service/darkgalaxy-api.service";

@Component({
  selector: 'dgt-alliance-orders-manager-panel',
  templateUrl: './orders-panel.component.html',
  styleUrls: ['./orders-panel.component.css']
})
export class OrdersPanelComponent {
  @ViewChild('dgtOrdersForm') ordersForm: NgForm;

  private orderService: OrderService = inject(OrderService);
  private dgAPI: DarkgalaxyApiService = inject(DarkgalaxyApiService);

  onSubmit(): void {
    let allianceOrder: AllianceOrder = new AllianceOrder();
    allianceOrder.target = [
      this.ordersForm.value['galaxy'],
      this.ordersForm.value['sector'],
      this.ordersForm.value['system'],
      this.ordersForm.value['planet']
    ].join('.');

    allianceOrder.wait = parseInt(this.ordersForm.value['wait']);
    allianceOrder.comment = this.ordersForm.value['comment'];
    allianceOrder.executed = false;
    allianceOrder.turn = this.dgAPI.gameTurn();
    allianceOrder.user = this.ordersForm.value['user'];

    this.orderService.updateOrder(allianceOrder);
  }
}
