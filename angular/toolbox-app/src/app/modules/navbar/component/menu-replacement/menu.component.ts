import {AfterViewInit, ChangeDetectorRef, Component, inject, Renderer2} from '@angular/core';
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
import {AllianceOrder} from "../../../../model/orders/alliance-order.model";

@Component({
  selector: 'dgt-navbar',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements AfterViewInit {
  private renderer: Renderer2 = inject(Renderer2);
  private badgeService: BadgeService = inject(BadgeService);
  private dgAPI: DarkgalaxyApiService = inject(DarkgalaxyApiService);
  private changeDetection: ChangeDetectorRef = inject(ChangeDetectorRef);
  private authService: AuthService = inject(AuthService);

  public fleetOrdersNotification: Observable<number>;
  public active: boolean;

  constructor(library: FaIconLibrary) {
    library.addIcons(fasHouseChimney, fasEarthAmericas, fasSatelliteDish, fasJetFighterUp, fasChessBoard, fasFlaskVial, fasHandFist);

    this.authService.loggedStatus.subscribe((status: boolean) => {
      this.active = status;

      if (status) {
        this.fleetOrdersNotification = new Observable<number>((observer) => {
          this.badgeService.subscribeToFleetOrders(this.dgAPI.username(), observer, this.changeDetection);
        });
      }

      this.changeDetection.detectChanges();
    });
  }

  ngAfterViewInit(): void {
    this.renderer.setStyle(document.body, 'visibility', 'visible');
  }
}
