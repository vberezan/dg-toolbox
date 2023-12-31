import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, inject, OnDestroy, ViewChild} from '@angular/core';
import {Observable, Subscriber} from "rxjs";
import {DarkgalaxyApiService} from "../../../darkgalaxy-ui-parser/service/darkgalaxy-api.service";
import {AuthService} from "../../../authentication/service/auth.service";
import {AuthState} from "../../../../shared/model/authentication/auth-state.model";
import {Analytics, logEvent} from "@angular/fire/analytics";
import {ChangelogService} from "../../../changelog/service/changelog.service";

@Component({
  selector: 'dgt-navbar',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnDestroy, AfterViewInit {
  @ViewChild('updateNotification') updateNotification: ElementRef;

  private dgAPI: DarkgalaxyApiService = inject(DarkgalaxyApiService);
  private changeDetector: ChangeDetectorRef = inject(ChangeDetectorRef);
  private authService: AuthService = inject(AuthService);
  private changelogService: ChangelogService = inject(ChangelogService);
  private analytics: Analytics = inject(Analytics);

  public updateAvailableNotification: Observable<boolean>;
  public active: boolean = false;
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

    this.updateAvailableNotification = new Observable<boolean>((changeObserver: Subscriber<boolean>): void => {
      this.changelogService.checkForUpdate(this.changeDetector, changeObserver);
    });

    this.authService.authState.subscribe((state: AuthState): void => {
      this.active = state.status;

      if (state.status && !this.initialized) {
        this.initialized = true;
      }
    });

    this.authService.checkLoginValidity();
  }

  ngAfterViewInit() {
  }

  ngOnDestroy(): void {
    this.authService.authState.unsubscribe();
  }

  protected readonly window = window;
}
