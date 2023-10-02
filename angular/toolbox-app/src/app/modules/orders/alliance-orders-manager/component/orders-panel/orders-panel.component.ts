import {ChangeDetectorRef, Component, inject, OnDestroy} from '@angular/core';
import {OrderService} from "../../service/order.service";
import {AllianceOrder} from "../../../../../shared/model/orders/alliance-order.model";
import {DarkgalaxyApiService} from "../../../../darkgalaxy-ui-parser/service/darkgalaxy-api.service";
import {AuthService} from "../../../../authentication/service/auth.service";
import {Observable, Subscriber} from "rxjs";
import {FaIconLibrary} from "@fortawesome/angular-fontawesome";
import {faCircleXmark as farCircleXmark} from "@fortawesome/free-regular-svg-icons"
import {faCircle as fasCircle} from "@fortawesome/free-solid-svg-icons"


@Component({
  selector: 'dgt-alliance-orders-manager-panel',
  templateUrl: './orders-panel.component.html',
  styleUrls: ['./orders-panel.component.css']
})
export class OrdersPanelComponent implements OnDestroy {
  private orderService: OrderService = inject(OrderService);
  private dgAPI: DarkgalaxyApiService = inject(DarkgalaxyApiService);
  private authService: AuthService = inject(AuthService);
  private changeDetection: ChangeDetectorRef = inject(ChangeDetectorRef);

  protected allianceMembers: string[];
  protected orders: Map<string, Observable<AllianceOrder[]>> = new Map<string, Observable<AllianceOrder[]>>();
  protected controls: {
    target: string[],
    wait: number[],
    instructions: string[]
  } = {
    target: [],
    wait: [],
    instructions: []
  }

  constructor(library: FaIconLibrary) {
    library.addIcons(farCircleXmark, fasCircle);
    this.allianceMembers = this.dgAPI.allianceMembers();

    this.controls.target = [];
    this.controls.wait = [];
    this.controls.instructions = [];

    this.allianceMembers.forEach((member: string) => {
      this.orders.set(member.toLowerCase(), new Observable<AllianceOrder[]>((observer: Subscriber<AllianceOrder[]>) => {
        this.orderService.getAllOrders(member.toLowerCase(), this.dgAPI.gameTurn(), this.changeDetection, observer);
      }));
    });
  }

  createOrder(idx: number): void {
    let allianceOrder: AllianceOrder = new AllianceOrder();
    allianceOrder.wait = this.controls.wait[idx]
    allianceOrder.instructions = this.controls.instructions[idx];
    allianceOrder.executed = false;
    allianceOrder.turn = this.dgAPI.gameTurn();
    allianceOrder.user = this.allianceMembers[idx].toLowerCase();

    this.orderService.updateOrder(allianceOrder);
  }

  ngOnDestroy(): void {
    this.authService.authState.unsubscribe();
  }
}
