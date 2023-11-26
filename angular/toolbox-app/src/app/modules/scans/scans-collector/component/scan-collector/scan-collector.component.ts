import {AfterViewInit, Component, inject, OnDestroy, OnInit} from '@angular/core';
import {ScanService} from "../../service/scan.service";
import {AuthService} from "../../../../authentication/service/auth.service";
import {AuthState} from "../../../../../shared/model/authentication/auth-state.model";
import {PlanetScanEvent} from "../../../../../shared/model/scans/planet-scan-event.model";

@Component({
  selector: 'dgt-scans-collector',
  templateUrl: './scan-collector.component.html',
  styleUrls: ['./scan-collector.component.css']
})
export class ScanCollectorComponent implements AfterViewInit, OnDestroy {
  private scanService: ScanService = inject(ScanService);
  private authService: AuthService = inject(AuthService);

  public active: boolean = false;
  private initialized: boolean = false;

  ngAfterViewInit(): void {
    this.authService.authState.subscribe((state: AuthState): void => {
      this.active = state.status;

      if (state.status && !this.initialized) {
        let planetScanEvent: PlanetScanEvent = this.scanService.extractScan();

        if (planetScanEvent != null) {
          this.scanService.updateScan(planetScanEvent);
        }

        this.initialized = true;
      }

      if (document.querySelector('dgt-scans-collector .dgt-spinner-container')) {
        document.querySelector('dgt-scans-collector .dgt-spinner-container').classList.add('hide');
        document.querySelector('dgt-scans-collector .dgt-spinner-container').classList.remove('show');
      }
    });

    this.scanService.scanSystem();

    this.authService.checkLoginValidity();
  }

  ngOnDestroy(): void {
    this.authService.authState.unsubscribe();
  }
}
