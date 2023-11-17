import {ChangeDetectorRef, Component, inject, OnDestroy} from '@angular/core';
import {Observable, Subscriber} from "rxjs";
import {DarkgalaxyApiService} from "../../../darkgalaxy-ui-parser/service/darkgalaxy-api.service";
import {AuthService} from "../../../authentication/service/auth.service";
import {AuthState} from "../../../../shared/model/authentication/auth-state.model";
import {LocalStorageService} from "../../../local-storage/local-storage-manager/service/local-storage.service";
import {LocalStorageKeys} from "../../../../shared/model/local-storage/local-storage-keys";
import {Analytics, logEvent} from "@angular/fire/analytics";
import {GlobalConfigService} from "../../service/global-config.service";
import {ChangelogService} from "../../../changelog/service/changelog.service";

@Component({
  selector: 'dgt-navbar',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnDestroy {
  private dgAPI: DarkgalaxyApiService = inject(DarkgalaxyApiService);
  private changeDetector: ChangeDetectorRef = inject(ChangeDetectorRef);
  private authService: AuthService = inject(AuthService);
  private localStorageService: LocalStorageService = inject(LocalStorageService);
  private globalConfigService: GlobalConfigService = inject(GlobalConfigService);
  private changelogService: ChangelogService = inject(ChangelogService);
  private analytics: Analytics = inject(Analytics);

  protected localUpdateBadge: boolean = false;

  public updateAvailableNotification: Observable<boolean>;
  public active: boolean;

  private initialized: boolean = false;

  constructor() {
    let event: string[] = window.location.pathname.split('/');

    if (event[1].length === 0) {
      logEvent(this.analytics, '/home');
    } else if (event[event.length - 2] === 'comms') {
      logEvent(this.analytics, '/scan');
    } else {
      logEvent(this.analytics, '/' + event[1]);
    }

    logEvent(this.analytics, 'page_view', {
      page_location: window.location.href,
      page_path: window.location.pathname,
      page_title: this.dgAPI.username()
    });

    this.localUpdateBadge = this.localStorageService.get(LocalStorageKeys.LOCAL_VERSION) !== this.localStorageService.get(LocalStorageKeys.REMOTE_VERSION);

    this.updateAvailableNotification = new Observable<boolean>((changeObserver: Subscriber<boolean>): void => {
      this.changelogService.checkVersion(this.changeDetector, changeObserver);
    });

    this.authService.authState.subscribe((state: AuthState): void => {
      this.active = state.status;

      if (state.status && !this.initialized) {
        this.globalConfigService.checkAndCachePlayersRankings();

        this.initialized = true;
      }
    });

    this.authService.checkLoginValidity();
  }

  ngOnDestroy(): void {
    this.authService.authState.unsubscribe();
  }
}
