import {ChangeDetectorRef, Component, inject, OnDestroy} from '@angular/core';
import {FaIconLibrary} from "@fortawesome/angular-fontawesome";
import {
  faChessBoard as fasChessBoard,
  faEarthAmericas as fasEarthAmericas,
  faFlaskVial as fasFlaskVial,
  faHandFist as fasHandFist,
  faHouseChimney as fasHouseChimney,
  faJetFighterUp as fasJetFighterUp,
  faSatelliteDish as fasSatelliteDish
} from "@fortawesome/free-solid-svg-icons";
import {BadgeService} from "../../service/badge.service";
import {Observable, Subscriber} from "rxjs";
import {DarkgalaxyApiService} from "../../../darkgalaxy-ui-parser/service/darkgalaxy-api.service";
import {AuthService} from "../../../authentication/service/auth.service";
import {AuthState} from "../../../../shared/model/authentication/auth-state.model";
import {LocalStorageService} from "../../../local-storage-manager/service/local-storage.service";
import {LocalStorageKeys} from "../../../../shared/model/local-storage/local-storage-keys";
import {Analytics, logEvent, setUserId} from "@angular/fire/analytics";

@Component({
  selector: 'dgt-navbar',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnDestroy {
  private badgeService: BadgeService = inject(BadgeService);
  private dgAPI: DarkgalaxyApiService = inject(DarkgalaxyApiService);
  private changeDetection: ChangeDetectorRef = inject(ChangeDetectorRef);
  private authService: AuthService = inject(AuthService);
  private localStorageService: LocalStorageService = inject(LocalStorageService);
  protected localOrdersBadge: number = 0;
  private analytics: Analytics = inject(Analytics);

  public fleetOrdersNotification: Observable<number>;
  public active: boolean;

  constructor(library: FaIconLibrary) {
    let event: string = window.location.pathname.split('/')[1];
    setUserId(this.analytics, this.dgAPI.username());
    logEvent(this.analytics, (event.length > 0 ? '/' + event : '/home'));

    library.addIcons(fasHouseChimney, fasEarthAmericas, fasSatelliteDish, fasJetFighterUp, fasChessBoard, fasFlaskVial, fasHandFist);
    this.localOrdersBadge = this.localStorageService.get(LocalStorageKeys.ACTIVE_ORDERS);

    this.authService.authState.subscribe((state: AuthState): void => {
      this.active = state.status;

      if (state.status) {
        this.fleetOrdersNotification = new Observable<number>((observer: Subscriber<number>): void => {
          this.badgeService.subscribeToFleetOrders(this.dgAPI.username(), observer, this.changeDetection);
        });
      }

      this.changeDetection.detectChanges();
    });

  }

  ngOnDestroy(): void {
    this.authService.authState.unsubscribe();
  }
}
