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

    this.authService.authState.subscribe((state: AuthState): void => {
      document.querySelector('dgt-alliance-orders-manager-panel .dgt-spinner-container').classList.add('show');
      document.querySelector('dgt-alliance-orders-manager-panel .dgt-spinner-container').classList.remove('hide');
      this.allianceMembers = this.dgAPI.allianceMembers(true);

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

          document.querySelector('dgt-alliance-orders-manager-panel .dgt-spinner-container').classList.add('hide');
          document.querySelector('dgt-alliance-orders-manager-panel .dgt-spinner-container').classList.remove('show');

          this.changeDetection.detectChanges();
        });

        this.statsService.loadStats(this.allianceMembers);
      }
    });

    this.authService.checkLoginValidity();
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
