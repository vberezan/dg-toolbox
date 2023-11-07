import {ChangeDetectorRef, Component, inject, OnDestroy} from '@angular/core';
import {OrderService} from "../../service/order.service";
import {DarkgalaxyApiService} from "../../../../darkgalaxy-ui-parser/service/darkgalaxy-api.service";
import {AllianceOrder} from "../../../../../shared/model/orders/alliance-order.model";
import {Observable, Subscriber} from "rxjs";
import {AuthService} from "../../../../authentication/service/auth.service";
import {AuthState} from "../../../../../shared/model/authentication/auth-state.model";
import {FaIconLibrary} from "@fortawesome/angular-fontawesome";
import {faCircleCheck as farCircleCheck} from "@fortawesome/free-regular-svg-icons";

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

  private initialized: boolean = false;

  constructor(library: FaIconLibrary) {
    library.addIcons(farCircleCheck);

    if (document.querySelector('dgt-fleet-orders-list-panel .dgt-spinner-container')) {
      document.querySelector('dgt-fleet-orders-list-panel .dgt-spinner-container').classList.add('show');
      document.querySelector('dgt-fleet-orders-list-panel .dgt-spinner-container').classList.remove('hide');
    }

    this.authService.authState.subscribe((state: AuthState): void => {
      this.active = state.status;

      if (state.status && !this.initialized) {
        this.orders = new Observable<AllianceOrder[]>((observer: Subscriber<AllianceOrder[]>): void => {
          this.orderService.getActiveOrders(this.dgAPI.username(), this.dgAPI.gameTurn(), this.changeDetection, observer);
        });

        this.initialized = true;
      }

      if (document.querySelector('dgt-fleet-orders-list-panel .dgt-spinner-container')) {
        document.querySelector('dgt-fleet-orders-list-panel .dgt-spinner-container').classList.add('hide');
        document.querySelector('dgt-fleet-orders-list-panel .dgt-spinner-container').classList.remove('show');
      }
    });

    this.authService.checkLoginValidity();
  }


  onCompleteClick(id: string) {
    this.orderService.completeOrder(id);
  }

  ngOnDestroy(): void {
    this.authService.authState.unsubscribe();
  }
}
