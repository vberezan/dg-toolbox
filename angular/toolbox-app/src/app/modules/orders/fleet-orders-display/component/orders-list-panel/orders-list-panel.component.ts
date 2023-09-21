import {ChangeDetectorRef, Component, inject, OnDestroy} from '@angular/core';
import {OrderService} from "../../service/order.service";
import {DarkgalaxyApiService} from "../../../../darkgalaxy-ui-parser/service/darkgalaxy-api.service";
import {AllianceOrder} from "../../../../../model/orders/alliance-order.model";
import {Observable, Subscriber} from "rxjs";
import {AuthService} from "../../../../authentication/service/auth.service";
import {AuthState} from "../../../../../model/authentication/auth-state.model";
import {state} from "@angular/animations";
import {FaIconLibrary} from "@fortawesome/angular-fontawesome";
import {
  faChessBoard as fasChessBoard,
  faEarthAmericas as fasEarthAmericas, faFlaskVial as fasFlaskVial, faHandFist as fasHandFist,
  faHouseChimney as fasHouseChimney, faJetFighterUp as fasJetFighterUp,
  faSatelliteDish as fasSatelliteDish
} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'dgt-fleet-orders-list-panel',
  templateUrl: './orders-list-panel.component.html',
  styleUrls: ['./orders-list-panel.component.css']
})
export class OrdersListPanelComponent implements OnDestroy{
  private orderService: OrderService = inject(OrderService);
  private dgAPI: DarkgalaxyApiService = inject(DarkgalaxyApiService);
  private changeDetection: ChangeDetectorRef = inject(ChangeDetectorRef);
  private authService: AuthService = inject(AuthService);

  public orders: Observable<AllianceOrder[]>;
  public active: boolean = false;

  constructor(library: FaIconLibrary) {
    library.addIcons(fasHouseChimney, fasEarthAmericas, fasSatelliteDish, fasJetFighterUp, fasChessBoard, fasFlaskVial, fasHandFist);

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
