import {ChangeDetectorRef, Component, inject} from '@angular/core';
import {OrderService} from "../../service/order.service";
import {DarkgalaxyApiService} from "../../../../darkgalaxy-ui-parser/service/darkgalaxy-api.service";
import {AllianceOrder} from "../../../../../model/orders/alliance-order.model";
import {Observable, Subscriber} from "rxjs";
import {AuthService} from "../../../../authentication/service/auth.service";

@Component({
  selector: 'dgt-fleet-orders-list-panel',
  templateUrl: './orders-list-panel.component.html',
  styleUrls: ['./orders-list-panel.component.css']
})
export class OrdersListPanelComponent {
  private orderService: OrderService = inject(OrderService);
  private dgAPI: DarkgalaxyApiService = inject(DarkgalaxyApiService);
  private changeDetection: ChangeDetectorRef = inject(ChangeDetectorRef);
  private authService: AuthService = inject(AuthService);

  public orders: Observable<AllianceOrder[]>;
  public active: boolean = false;

  constructor() {
    this.authService.loggedStatus.subscribe((status: boolean) => {
      this.active = status;
      this.changeDetection.detectChanges();

      if (status) {
        this.orders = new Observable<AllianceOrder[]>((observer: Subscriber<AllianceOrder[]>) => {
          this.orderService.getOrders(this.dgAPI.username(), this.dgAPI.gameTurn(), observer, this.changeDetection);
        });
      }
    });
  }
}
