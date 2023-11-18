import {AfterViewInit, Component, ElementRef, inject, OnDestroy, ViewChild} from '@angular/core';
import {DarkgalaxyApiService} from "../../../../darkgalaxy-ui-parser/service/darkgalaxy-api.service";
import {AuthService} from "../../../../authentication/service/auth.service";
import {Observable, Subscriber} from "rxjs";
import {FaIconLibrary} from "@fortawesome/angular-fontawesome";
import {faCircleXmark as farCircleXmark} from "@fortawesome/free-regular-svg-icons";
import {AllianceMember} from "../../../../../shared/model/alliances/alliance-member.model";
import {AuthState} from "../../../../../shared/model/authentication/auth-state.model";
import {UserRole} from "../../../../../shared/model/authentication/user-role";
import {LocalStorageService} from "../../../../local-storage/local-storage-manager/service/local-storage.service";
import {LocalStorageKeys} from "../../../../../shared/model/local-storage/local-storage-keys";
import {MembersPanelService} from "../../service/members-panel.service";


@Component({
  selector: 'dgt-alliance-members',
  templateUrl: './members-panel.component.html',
  styleUrls: ['./members-panel.component.css']
})
export class MembersPanelComponent implements OnDestroy, AfterViewInit {
  @ViewChild('dgtSpinner') loadSpinner: ElementRef;
  @ViewChild('dgtMainContainer') mainContainer: ElementRef;

  private authService: AuthService = inject(AuthService);
  private localStorageService: LocalStorageService = inject(LocalStorageService);
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
        this.allianceMembers = this.membersPanelService.fetchAndClean();
        this.active = state.status;

        this.role = new Observable<string>((observer: Subscriber<string>): void => {
          observer.next(state.role);
          observer.complete();
        });

        this.membersPanelService.sortMembersByScore(this.allianceMembers);
        this.initialized = true;
      }
    });

    this.authService.checkLoginValidity();
  }

  ngAfterViewInit() {
    this.membersPanelService.showComponent(this.loadSpinner, this.mainContainer);
  }

  ngOnDestroy(): void {
    this.authService.authState.unsubscribe();
  }

  onSubmitKickMember(event: any): void {
    this.localStorageService.remove(LocalStorageKeys.ALLIANCE_MEMBERS);
    event.target.submit();
  }
}
