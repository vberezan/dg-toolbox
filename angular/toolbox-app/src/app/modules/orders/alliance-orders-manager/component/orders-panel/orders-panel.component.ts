import {ChangeDetectorRef, Component, inject, OnDestroy} from '@angular/core';
import {OrderService} from "../../service/order.service";
import {AllianceOrder} from "../../../../../shared/model/orders/alliance-order.model";
import {DarkgalaxyApiService} from "../../../../darkgalaxy-ui-parser/service/darkgalaxy-api.service";
import {AuthService} from "../../../../authentication/service/auth.service";
import {Observable, Subscriber} from "rxjs";
import {FaIconLibrary} from "@fortawesome/angular-fontawesome";
import {faCircleRight as farCircleRight, faCircleXmark as farCircleXmark} from "@fortawesome/free-regular-svg-icons";
import {AllianceMember} from "../../../../../shared/model/orders/alliance-member.model";
import {AuthState} from "../../../../../shared/model/authentication/auth-state.model";
import {UserRole} from "../../../../../shared/model/authentication/user-role";


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

  protected allianceMembers: AllianceMember[];
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
    library.addIcons(farCircleXmark, farCircleRight);

    this.authService.authState.subscribe((state: AuthState) => {
      if (state.status && state.role) {
        this.allianceMembers = this.dgAPI.allianceMembers(true);

        this.controls.target = [];
        this.controls.wait = [];
        this.controls.instructions = [];

        if (state.role === UserRole.ADMIN) {
          this.allianceMembers.forEach((member: AllianceMember): void => {
            this.orders.set(member.name.toLowerCase(), new Observable<AllianceOrder[]>((observer: Subscriber<AllianceOrder[]>): void => {
              this.orderService.getAllOrders(member.name.toLowerCase(), this.dgAPI.gameTurn(), this.changeDetection, observer);
            }));
          });
        }

        this.changeDetection.detectChanges();
      }
    });
  }

  createOrder(idx: number): void {
    let allianceOrder: AllianceOrder = new AllianceOrder();
    allianceOrder.wait = this.controls.wait[idx]
    allianceOrder.instructions = this.controls.instructions[idx];
    allianceOrder.target = this.controls.target[idx];
    allianceOrder.executed = false;
    allianceOrder.turn = this.dgAPI.gameTurn();
    allianceOrder.user = this.allianceMembers[idx].name.toLowerCase();

    this.orderService.updateOrder(allianceOrder);
  }

  deleteOrder(id: string): void {
    this.orderService.deleteOrder(id);
  }

  ngOnDestroy(): void {
    this.authService.authState.unsubscribe();
  }

  onSubmitKickMember(event: any): void {
    event.target.submit();
  }

  onSubmitUpdateNote(event: any) {
    event.target.submit();
  }
}
