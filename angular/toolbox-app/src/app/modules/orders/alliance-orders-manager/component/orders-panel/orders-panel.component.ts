import {ChangeDetectorRef, Component, inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {OrderService} from "../../service/order.service";
import {AllianceOrder} from "../../../../../model/orders/alliance-order.model";
import {DarkgalaxyApiService} from "../../../../darkgalaxy-ui-parser/service/darkgalaxy-api.service";
import {AuthService} from "../../../../authentication/service/auth.service";
import {Observable, Subscriber} from "rxjs";
import {FaIconLibrary} from "@fortawesome/angular-fontawesome";
import {faCircleXmark as farCircleXmark} from "@fortawesome/free-regular-svg-icons"


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
  private changeDetection: ChangeDetectorRef = inject(ChangeDetectorRef);

  protected allianceMembers: string[];
  protected orders: Map<string, Observable<AllianceOrder[]>> = new Map<string, Observable<AllianceOrder[]>>();
  protected controls: {
    'target': string[],
    'wait' : number[],
    'instructions' : string[]
  }

  constructor(library: FaIconLibrary) {
    library.addIcons(farCircleXmark);
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

  createOrder(idx: number): void {
    console.log(this.allianceMembers[idx]);
    console.log(this.controls.target[idx]);
    console.log(this.controls.wait[idx]);
    console.log(this.controls.instructions[idx]);
  }

  ngOnInit() {
    // this.authService.authState.subscribe((state: AuthState) => {
    //   if (state.status && state.role == UserRole.ADMIN) {
    //     document.querySelectorAll('.allianceBox .playerList table').forEach((table: any) => {
    //       table.style.display = 'table';
    //     });
    //     document.querySelectorAll('.allianceBox .playerList div.name').forEach((playerName: any, idx: number) => {
    //       this.orderService.fillActiveOrders(playerName.childNodes[0].textContent.trim(), this.dgAPI.gameTurn(), idx);
    //     });
    //   } else {
    //     document.querySelectorAll('.allianceBox .playerList table').forEach((table: Element) => {
    //       table.remove();
    //     });
    //   }
    // });
  }

  ngOnDestroy(): void {
    this.authService.authState.unsubscribe();
  }
}
