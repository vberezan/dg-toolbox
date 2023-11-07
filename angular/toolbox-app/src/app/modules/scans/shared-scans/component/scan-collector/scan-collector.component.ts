import {ChangeDetectorRef, Component, inject, OnDestroy, OnInit} from '@angular/core';
import {ScanService} from "../../service/scan.service";
import {PlanetScanEvent} from "../../../../../shared/model/scans/shared-scans-planet-scan-event.model";
import {AuthService} from "../../../../authentication/service/auth.service";
import {AuthState} from "../../../../../shared/model/authentication/auth-state.model";

@Component({
  selector: 'dgt-shared-scans-collector',
  templateUrl: './scan-collector.component.html',
  styleUrls: ['./scan-collector.component.css']
})
export class ScanCollectorComponent implements OnInit, OnDestroy {
  private scanService: ScanService = inject(ScanService);
  private authService: AuthService = inject(AuthService);
  private changeDetection: ChangeDetectorRef = inject(ChangeDetectorRef);

  public active: boolean = false;
  private initialized: boolean = false;

  ngOnInit(): void {
    this.authService.authState.subscribe((state: AuthState) => {
      this.active = state.status;

      if (state.status && !this.initialized) {
        let planetScanEvent: PlanetScanEvent = this.scanService.extractScan();

        if (planetScanEvent != null) {
          this.scanService.updateScan(planetScanEvent);
        }
      }

      if (document.querySelector('dgt-shared-scans-collector .dgt-spinner-container')) {
        document.querySelector('dgt-shared-scans-collector .dgt-spinner-container').classList.add('hide');
        document.querySelector('dgt-shared-scans-collector .dgt-spinner-container').classList.remove('show');
      }
    });

    this.authService.checkLoginValidity();
  }

  ngOnDestroy(): void {
    this.authService.authState.unsubscribe();
  }
}
