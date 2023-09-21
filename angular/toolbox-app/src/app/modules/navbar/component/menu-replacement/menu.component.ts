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
import {Observable} from "rxjs";
import {DarkgalaxyApiService} from "../../../darkgalaxy-ui-parser/service/darkgalaxy-api.service";

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
  public fleetOrdersNotification: Observable<number>;

  constructor(library: FaIconLibrary) {
    library.addIcons(fasHouseChimney, fasEarthAmericas, fasSatelliteDish, fasJetFighterUp, fasChessBoard, fasFlaskVial, fasHandFist);

    this.fleetOrdersNotification = new Observable<number>((observer) => {
      this.badgeService.subscribeToFleetOrders(this.dgAPI.username(), observer, this.changeDetection);
    });
  }

  ngAfterViewInit(): void {
    this.renderer.setStyle(document.body, 'visibility', 'visible');
  }
}
