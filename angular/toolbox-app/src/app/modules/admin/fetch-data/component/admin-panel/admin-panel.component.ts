import {ChangeDetectorRef, Component, ElementRef, EventEmitter, inject, ViewChild} from '@angular/core';
import {PlanetsLoaderService} from "../../service/planets-loader.service";
import {Subscription} from "rxjs";
import {PageAction} from "../../../../../shared/model/stats/page-action.model";
import {AuthService} from "../../../../authentication/service/auth.service";
import {AuthState} from "../../../../../shared/model/authentication/auth-state.model";

@Component({
  selector: 'dgt-admin-load-data-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent {
  @ViewChild('planetsLoadModal') planetsLoadModal: ElementRef;
  @ViewChild('planetProgressBar') planetProgressBar: ElementRef;
  @ViewChild('playersProgressBar') playersProgressBar: ElementRef;
  @ViewChild('planetCounter') planetCounter: ElementRef;

  private planetsLoaderService: PlanetsLoaderService = inject(PlanetsLoaderService);
  private changeDetection: ChangeDetectorRef = inject(ChangeDetectorRef);
  private authService: AuthService = inject(AuthService);

  private cancelScanEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();
  private systemCountSubscription: Subscription;
  private planetsCountSubscription: Subscription;

  public authenticated: boolean = false;

  protected controls: {
    galaxies: string
  } = {
    galaxies: ''
  }

  protected loadedSystem: string;
  protected loadedPlanet: string = '';
  protected planetPercentage: number = 0;
  protected playersPercentage: number = 0;

  constructor() {
    this.authService.authState.subscribe((state: AuthState): void => {
      this.authenticated = state.status && (state.role === 'admin' || state.role === 'tl');
    });

    this.authService.checkLoginValidity();
  }

  async scanNavigationScreen(): Promise<void> {
    if (this.authenticated) {
      let galaxies: number[] = this.controls.galaxies.trim().split(',').map(function (item: string) {
        return parseInt(item, 10);
      });

      this.loadedSystem = 'Loading planet systems: ';
      this.planetProgressBar.nativeElement.style.width = '0%';
      this.planetsLoadModal.nativeElement.classList.add('show');
      this.planetsLoadModal.nativeElement.classList.remove('hide');
      document.body.classList.add('dgt-overlay-open');

      this.systemCountSubscription = this.planetsLoaderService.systemScanEmitter.subscribe((value: PageAction): void => {
        this.loadedSystem = 'Loading ' + value.page + '/' + value.total + ' system: ';
        this.changeDetection.detectChanges();
        this.planetPercentage = Math.floor((value.page * 100) / value.total);
        this.planetProgressBar.nativeElement.style.width = this.planetPercentage + '%';
      });

      this.planetsCountSubscription = this.planetsLoaderService.planetScanEmitter.subscribe((value: string): void => {
        this.planetCounter.nativeElement.style.visibility = 'hidden';
        this.loadedPlanet = value;
        this.planetCounter.nativeElement.style.visibility = 'visible';
      });

      await this.planetsLoaderService.scanPlanets(this.cancelScanEmitter, galaxies);

      this.cancelScan();
    }
  }

  cancelScan(): void {
    if (this.authenticated) {
      this.cancelScanEmitter.emit(true);
      document.body.classList.remove('dgt-overlay-open');
      this.planetsLoadModal.nativeElement.classList.add('hide');
      this.planetsLoadModal.nativeElement.classList.remove('show');

      if (this.systemCountSubscription) {
        this.systemCountSubscription.unsubscribe();
      }

      if (this.planetsCountSubscription) {
        this.planetsCountSubscription.unsubscribe();
      }
    }
  }
}
