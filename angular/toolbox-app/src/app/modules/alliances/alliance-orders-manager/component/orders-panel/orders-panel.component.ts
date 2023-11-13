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
import {LocalStorageService} from "../../../../local-storage-manager/service/local-storage.service";
import {LocalStorageKeys} from "../../../../../shared/model/local-storage/local-storage-keys";
import {StatsService} from "../../service/stats.service";


@Component({
  selector: 'dgt-alliance-orders-manager-panel',
  templateUrl: './orders-panel.component.html',
  styleUrls: ['./orders-panel.component.css']
})
export class OrdersPanelComponent implements OnDestroy {
  protected readonly UserRole = UserRole;

  private orderService: OrderService = inject(OrderService);
  private dgAPI: DarkgalaxyApiService = inject(DarkgalaxyApiService);
  private authService: AuthService = inject(AuthService);
  private changeDetection: ChangeDetectorRef = inject(ChangeDetectorRef);
  private localStorageService: LocalStorageService = inject(LocalStorageService);
  private statsService: StatsService = inject(StatsService);

  protected allianceMembers: AllianceMember[];
  protected orders: Map<string, Observable<AllianceOrder[]>> = new Map<string, Observable<AllianceOrder[]>>();
  protected role: Observable<string>;
  protected controls: {
    target: string[],
    wait: number[],
    instructions: string[]
  } = {
    target: [],
    wait: [],
    instructions: []
  }
  private initialized: boolean = false;

  constructor(library: FaIconLibrary) {
    library.addIcons(farCircleXmark, farCircleRight);
    this.allianceMembers = this.dgAPI.allianceMembers(true);

    this.authService.authState.subscribe((state: AuthState): void => {
      if (document.querySelector('dgt-alliance-orders-manager-panel .dgt-spinner-container.main')) {
        document.querySelector('dgt-alliance-orders-manager-panel .dgt-spinner-container.main').classList.add('show');
        document.querySelector('dgt-alliance-orders-manager-panel .dgt-spinner-container.main').classList.remove('hide');
      }

      if (state.status) {
        this.controls.target = [];
        this.controls.wait = [];
        this.controls.instructions = [];

        this.role = new Observable<string>((observer: Subscriber<string>): void => {
          observer.next(state.role);
          observer.complete();
        });

        this.statsService.statsEventEmitter.subscribe((value: {
          'name': string,
          'score': number,
          'combatScore': number,
          'planets': number
        }): void => {
          this.allianceMembers.forEach((member: AllianceMember): void => {
            if (member.name.toLowerCase() === value.name) {
              member.score = value.score;
              member.combatScore = value.combatScore;
              member.planets = value.planets;
            }
          });

          for (let i = 0; i < this.allianceMembers.length - 1; i++) {
            for (let j = i + 1; j < this.allianceMembers.length; j++) {
              if (this.allianceMembers[i].score < this.allianceMembers[j].score) {
                let aux: AllianceMember = this.allianceMembers[i];
                this.allianceMembers[i] = this.allianceMembers[j];
                this.allianceMembers[j] = aux;
              }
            }
          }

          this.changeDetection.detectChanges();
        });
        this.statsService.loadStats(this.allianceMembers);

        if (state.role === UserRole.ADMIN || state.role === UserRole.TEAM_LEADER) {
          this.dgAPI.cleanAlianceMembers();

          if (!this.initialized) {
            this.allianceMembers.forEach((member: AllianceMember): void => {
              this.orders.set(member.name.toLowerCase(), new Observable<AllianceOrder[]>((observer: Subscriber<AllianceOrder[]>): void => {
                this.orderService.getAllOrders(member.name.toLowerCase(), this.dgAPI.gameTurn(), this.changeDetection, observer);
              }));
            });

            this.initialized = true;
          }
        }
      }

      if (document.querySelector('dgt-alliance-orders-manager-panel .dgt-spinner-container.main')) {
        document.querySelector('dgt-alliance-orders-manager-panel .dgt-spinner-container.main').classList.add('hide');
        document.querySelector('dgt-alliance-orders-manager-panel .dgt-spinner-container.main').classList.remove('show');
      }
    });

    this.authService.checkLoginValidity();
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
    this.localStorageService.remove(LocalStorageKeys.ALLIANCE_MEMBERS);
    event.target.submit();
  }

  onSubmitUpdateNote(event: any) {
    this.localStorageService.remove(LocalStorageKeys.ALLIANCE_MEMBERS);
    event.target.submit();
  }

}
