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

        this.statsService.statsEventEmitter.subscribe((value: AllianceMemberStats): void => {
          console.log(value);
          this.allianceMembers.forEach((member: AllianceMember): void => {
            if (member.name.toLowerCase() === value.name) {
              member.stats.score = value.score;
              member.stats.combatScore = value.combatScore;
              member.stats.planets = value.planets;
              member.stats.rank = value.rank;
            }
          });

          for (let i: number = 0; i < this.allianceMembers.length - 1; i++) {
            for (let j: number = i + 1; j < this.allianceMembers.length; j++) {
              if (this.allianceMembers[i].stats && this.allianceMembers[j].stats &&
                this.allianceMembers[i].stats.score < this.allianceMembers[j].stats.score) {

                let aux: AllianceMember = this.allianceMembers[i];
                this.allianceMembers[i] = this.allianceMembers[j];
                this.allianceMembers[j] = aux;
              }
            }
          }

          if (this.loadSpinner.nativeElement.classList.contains('show')) {
            this.loadSpinner.nativeElement.classList.add('hide');
            this.loadSpinner.nativeElement.classList.remove('show');
          }

          if (this.mainContainer.nativeElement.classList.contains('hide')) {
            this.mainContainer.nativeElement.classList.add('show');
            this.mainContainer.nativeElement.classList.remove('hide');
          }

          this.changeDetection.detectChanges();
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
