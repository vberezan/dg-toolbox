import {AfterViewInit, Component, inject} from '@angular/core';
import {FightSimulatorService} from "../../service/fight-simulator.service";
import {DarkgalaxyApiService} from "../../../../darkgalaxy-ui-parser/service/darkgalaxy-api.service";
import {Fleet} from "../../../../../shared/model/fleet/fleet.model";
import {FleetScoreService} from "../../service/fleet-score.service";
import {AuthService} from "../../../../authentication/service/auth.service";
import {AuthState} from "../../../../../shared/model/authentication/auth-state.model";

@Component({
  selector: 'dgt-fleet-scan-details',
  template: '',
  styles: ['']
})
export class FleetScanDetailsComponent implements AfterViewInit {
  private fightSimulatorService: FightSimulatorService = inject(FightSimulatorService);
  private fleetScoreService: FleetScoreService = inject(FleetScoreService);
  private dgAPI: DarkgalaxyApiService = inject(DarkgalaxyApiService);
  private authService: AuthService = inject(AuthService);

  private initialized: boolean = false;
  ngAfterViewInit() {
    this.authService.authState.subscribe((state: AuthState): void => {

      if (state.status && !this.initialized) {
        const fleets: Fleet[] = this.dgAPI.fleetScan();

        fleets.forEach((fleet: Fleet): void => {
          if (fleet.allied || fleet.friendly) {
            for (let i = 0; i < fleet.ships.length; i++) {
              fleet.ships[i].quantity += Math.ceil(fleet.ships[i].quantity / 4);
            }
          }
        });

        this.fleetScoreService.applyFleetScore(fleets);
        this.fightSimulatorService.createSimulation(fleets);

        this.initialized = true;
      }
    });

    this.authService.checkLoginValidity();
  }
}
