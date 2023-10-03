import {ChangeDetectorRef, Component, inject, OnDestroy} from '@angular/core';
import {OrderService} from "../../service/order.service";
import {DarkgalaxyApiService} from "../../../../darkgalaxy-ui-parser/service/darkgalaxy-api.service";
import {AllianceOrder} from "../../../../../shared/model/orders/alliance-order.model";
import {Observable, Subscriber} from "rxjs";
import {AuthService} from "../../../../authentication/service/auth.service";
import {AuthState} from "../../../../../shared/model/authentication/auth-state.model";

@Component({
  selector: 'dgt-fleet-orders-list-panel',
  templateUrl: './orders-list-panel.component.html',
  styleUrls: ['./orders-list-panel.component.css']
})
export class OrdersListPanelComponent implements OnDestroy {
  private orderService: OrderService = inject(OrderService);
  private dgAPI: DarkgalaxyApiService = inject(DarkgalaxyApiService);
  private changeDetection: ChangeDetectorRef = inject(ChangeDetectorRef);
  private authService: AuthService = inject(AuthService);

  public orders: Observable<AllianceOrder[]>;
  public active: boolean = false;

  constructor() {
    this.authService.authState.subscribe((state: AuthState) => {
      this.active = state.status;

      if (state.status) {
        this.orders = new Observable<AllianceOrder[]>((observer: Subscriber<AllianceOrder[]>) => {
          this.orderService.getActiveOrders(this.dgAPI.username(), this.dgAPI.gameTurn(), this.changeDetection, observer);
        });
      }

      this.changeDetection.detectChanges();
    });
  }


  onCompleteClick(id: string) {
    this.orderService.completeOrder(id);
  }

  ngOnDestroy(): void {
    this.authService.authState.unsubscribe();
  }
}
