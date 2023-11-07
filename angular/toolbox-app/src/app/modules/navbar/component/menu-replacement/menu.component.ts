import {ChangeDetectorRef, Component, inject, OnDestroy} from '@angular/core';
import {BadgeService} from "../../service/badge.service";
import {Observable, Subscriber} from "rxjs";
import {DarkgalaxyApiService} from "../../../darkgalaxy-ui-parser/service/darkgalaxy-api.service";
import {AuthService} from "../../../authentication/service/auth.service";
import {AuthState} from "../../../../shared/model/authentication/auth-state.model";
import {LocalStorageService} from "../../../local-storage-manager/service/local-storage.service";
import {LocalStorageKeys} from "../../../../shared/model/local-storage/local-storage-keys";
import {Analytics, logEvent} from "@angular/fire/analytics";
import {ChangelogService} from "../../../changelog/service/changelog.service";

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
  private analytics: Analytics = inject(Analytics);

  protected localOrdersBadge: number = 0;
  protected localUpdateBadge: boolean = false;

  public fleetOrdersNotification: Observable<number>;
  public updateAvailableNotification: Observable<boolean>;
  public active: boolean;

  private initialized: boolean = false;

  constructor() {
    let event: string[] = window.location.pathname.split('/');

    if (event[1].length === 0) {
      logEvent(this.analytics, '/home');
    } else if (event[event.length-2] === 'comms') {
      logEvent(this.analytics, '/scan');
    } else {
      logEvent(this.analytics, '/' + event[1]);
    }

    logEvent(this.analytics, 'page_view', {
      page_location: window.location.href,
      page_path: window.location.pathname,
      page_title: this.dgAPI.username()
    });

    this.localOrdersBadge = this.localStorageService.get(LocalStorageKeys.ACTIVE_ORDERS);
    this.localUpdateBadge = this.localStorageService.get(LocalStorageKeys.UPDATE_AVAILABLE);

    this.updateAvailableNotification = new Observable<boolean>((observer: Subscriber<boolean>): void => {
      this.badgeService.checkVersion(observer, this.changeDetection);
    });

    this.authService.authState.subscribe((state: AuthState): void => {
      this.active = state.status;

      if (state.status && !this.initialized) {
        this.fleetOrdersNotification = new Observable<number>((observer: Subscriber<number>): void => {
          this.badgeService.checkFleetOrders(this.dgAPI.username(), observer, this.changeDetection);
        });

        this.initialized = true;
      }
    });

    this.authService.checkLoginValidity();
  }

  ngOnDestroy(): void {
    this.authService.authState.unsubscribe();
  }
}
