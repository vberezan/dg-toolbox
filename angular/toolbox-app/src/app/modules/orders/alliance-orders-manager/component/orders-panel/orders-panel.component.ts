import {Component, inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {OrderService} from "../../service/order.service";
import {AllianceOrder} from "../../../../../model/orders/alliance-order.model";
import {DarkgalaxyApiService} from "../../../../darkgalaxy-ui-parser/service/darkgalaxy-api.service";
import {AuthService} from "../../../../authentication/service/auth.service";
import {AuthState} from "../../../../../model/authentication/auth-state.model";
import {UserRole} from "../../../../../model/authentication/user-role";

@Component({
  selector: 'dgt-alliance-orders-manager-panel',
  templateUrl: './orders-panel.component.html',
  styleUrls: ['./orders-panel.component.css']
})
export class OrdersPanelComponent implements OnInit, OnDestroy {
  @ViewChild('dgtOrdersForm') ordersForm: NgForm;

  private orderService: OrderService = inject(OrderService);
  private dgAPI: DarkgalaxyApiService = inject(DarkgalaxyApiService);
  private authService: AuthService = inject(AuthService);

  protected allianceMembers: string[] = [];
  protected username: string;
  protected gameTurn: number;

  constructor() {
    this.allianceMembers = this.dgAPI.allianceMembers();
    this.username = this.dgAPI.username();
    this.gameTurn = this.dgAPI.gameTurn();
  }

  onSubmit(): void {
    let allianceOrder: AllianceOrder = new AllianceOrder();
    allianceOrder.target = [
      this.ordersForm.value['galaxy'],
      this.ordersForm.value['sector'],
      this.ordersForm.value['system'],
      this.ordersForm.value['planet']
    ].join('.');

    allianceOrder.wait = parseInt(this.ordersForm.value['wait']);
    allianceOrder.instructions = this.ordersForm.value['instructions'];
    allianceOrder.executed = false;
    allianceOrder.turn = this.dgAPI.gameTurn();
    allianceOrder.user = this.ordersForm.value['user'].toLowerCase();

    this.orderService.updateOrder(allianceOrder);
  }

  ngOnInit() {
    this.authService.authState.subscribe((state: AuthState) => {
      if (state.status && state.role == UserRole.ADMIN) {
        document.querySelectorAll('.allianceBox .playerList table').forEach((table: any) => {
          table.style.display = 'table';
        });
        document.querySelectorAll('.allianceBox .playerList div.name').forEach((playerName: any, idx: number) => {
          this.orderService.fillActiveOrders(playerName.childNodes[0].textContent.trim(), this.dgAPI.gameTurn(), idx);
        });
      } else {
        document.querySelectorAll('.allianceBox .playerList table').forEach((table: Element) => {
          table.remove();
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.authService.authState.unsubscribe();
  }
}
