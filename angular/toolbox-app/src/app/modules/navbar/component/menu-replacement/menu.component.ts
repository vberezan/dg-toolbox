import {AfterViewInit, ChangeDetectorRef, Component, inject, OnDestroy, Renderer2} from '@angular/core';
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

@Component({
  selector: 'dgt-navbar',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements AfterViewInit, OnDestroy {
  private renderer: Renderer2 = inject(Renderer2);
  private badgeService: BadgeService = inject(BadgeService);
  private dgAPI: DarkgalaxyApiService = inject(DarkgalaxyApiService);
  private changeDetection: ChangeDetectorRef = inject(ChangeDetectorRef);
  private authService: AuthService = inject(AuthService);

  public fleetOrdersNotification: Observable<number>;
  public active: boolean;

  constructor(library: FaIconLibrary) {
    library.addIcons(fasHouseChimney, fasEarthAmericas, fasSatelliteDish, fasJetFighterUp, fasChessBoard, fasFlaskVial, fasHandFist);

    this.fleetOrdersNotification = new Observable<number>((observer: Subscriber<number>): void => {
      observer.next(1000);
      observer.complete();
      this.active = true;
    });
    this.changeDetection.detectChanges();

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

  ngAfterViewInit(): void {
    this.renderer.setStyle(document.body, 'visibility', 'visible');
  }

  ngOnDestroy(): void {
    this.authService.authState.unsubscribe();
  }
}
