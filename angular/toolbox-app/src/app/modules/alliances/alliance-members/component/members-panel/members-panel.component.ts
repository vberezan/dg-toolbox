import {ChangeDetectorRef, Component, ElementRef, inject, OnDestroy, ViewChild} from '@angular/core';
import {DarkgalaxyApiService} from "../../../../darkgalaxy-ui-parser/service/darkgalaxy-api.service";
import {AuthService} from "../../../../authentication/service/auth.service";
import {Observable, Subscriber} from "rxjs";
import {FaIconLibrary} from "@fortawesome/angular-fontawesome";
import {faCircleXmark as farCircleXmark} from "@fortawesome/free-regular-svg-icons";
import {AllianceMember} from "../../../../../shared/model/alliances/alliance-member.model";
import {AuthState} from "../../../../../shared/model/authentication/auth-state.model";
import {UserRole} from "../../../../../shared/model/authentication/user-role";
import {LocalStorageService} from "../../../../local-storage-manager/service/local-storage.service";
import {LocalStorageKeys} from "../../../../../shared/model/local-storage/local-storage-keys";
import {StatsService} from "../../service/stats.service";
import {AllianceMemberStats} from "../../../../../shared/model/alliances/alliance-member-stats.model";
import {MembersPanelService} from "../../service/members-panel.service";


@Component({
  selector: 'dgt-alliance-members',
  templateUrl: './members-panel.component.html',
  styleUrls: ['./members-panel.component.css']
})
export class MembersPanelComponent implements OnDestroy {
  @ViewChild('dgtSpinner') loadSpinner: ElementRef;
  @ViewChild('dgtMainContainer') mainContainer: ElementRef;

  private dgAPI: DarkgalaxyApiService = inject(DarkgalaxyApiService);
  private authService: AuthService = inject(AuthService);
  private changeDetection: ChangeDetectorRef = inject(ChangeDetectorRef);
  private localStorageService: LocalStorageService = inject(LocalStorageService);
  private statsService: StatsService = inject(StatsService);
  private membersPanelService: MembersPanelService = inject(MembersPanelService);

  public active: boolean = false;
  private initialized: boolean = false;
  protected readonly UserRole = UserRole;
  protected allianceMembers: AllianceMember[];
  protected role: Observable<string>;

  constructor(library: FaIconLibrary) {
    library.addIcons(farCircleXmark);

    this.authService.authState.subscribe((state: AuthState): void => {
      if (state.status && !this.initialized) {
        this.allianceMembers = this.dgAPI.allianceMembers(true);
        this.active = state.status;

        this.role = new Observable<string>((observer: Subscriber<string>): void => {
          observer.next(state.role);
          observer.complete();
        });

        this.statsService.statsEventEmitter.subscribe((stats: AllianceMemberStats): void => {
          this.membersPanelService.setStats(this.allianceMembers, stats);
          this.membersPanelService.sortMembersByScore(this.allianceMembers);
          // this.membersPanelService.showComponent(this.loadSpinner, this.mainContainer);
          // this.changeDetection.detectChanges();
        });

        this.statsService.loadStats(this.allianceMembers);
        this.initialized = true;
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
}
