import {ChangeDetectorRef, Component, ElementRef, inject, OnDestroy, ViewChild} from '@angular/core';
import {DarkgalaxyApiService} from "../../../../darkgalaxy-ui-parser/service/darkgalaxy-api.service";
import {AuthService} from "../../../../authentication/service/auth.service";
import {Observable, Subscriber} from "rxjs";
import {FaIconLibrary} from "@fortawesome/angular-fontawesome";
import {faCircleXmark as farCircleXmark} from "@fortawesome/free-regular-svg-icons";
import {AllianceMember} from "../../../../../shared/model/orders/alliance-member.model";
import {AuthState} from "../../../../../shared/model/authentication/auth-state.model";
import {UserRole} from "../../../../../shared/model/authentication/user-role";
import {LocalStorageService} from "../../../../local-storage-manager/service/local-storage.service";
import {LocalStorageKeys} from "../../../../../shared/model/local-storage/local-storage-keys";
import {StatsService} from "../../service/stats.service";


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
      this.active = state.status;

      if (state.status && !this.initialized) {
        this.allianceMembers = this.dgAPI.allianceMembers(true);

        this.role = new Observable<string>((observer: Subscriber<string>): void => {
          observer.next(state.role);
          observer.complete();
        });

        this.statsService.statsEventEmitter.subscribe((value: {
          'name': string,
          'score': number,
          'combatScore': number,
          'rank': number,
          'planets': number
        }): void => {
          this.allianceMembers.forEach((member: AllianceMember): void => {
            if (member.name.toLowerCase() === value.name) {
              member.score = value.score;
              member.combatScore = value.combatScore;
              member.planets = value.planets;
              member.rank = value.rank;
            }
          });

          for (let i = 0; i < this.allianceMembers.length - 1; i++) {
            for (let j = i + 1; j < this.allianceMembers.length; j++) {
              if (this.allianceMembers[i].score < this.allianceMembers[j].score) {
                let aux: AllianceMember = this.allianceMembers[i];
                this.allianceMembers[i] = this.allianceMembers[j];
                this.allianceMembers[j] = aux;
              }
            }
          }

          this.loadSpinner.nativeElement.classList.add('hide');
          this.loadSpinner.nativeElement.classList.remove('show');
          this.mainContainer.nativeElement.classList.add('show');
          this.mainContainer.nativeElement.classList.remove('hide');

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
