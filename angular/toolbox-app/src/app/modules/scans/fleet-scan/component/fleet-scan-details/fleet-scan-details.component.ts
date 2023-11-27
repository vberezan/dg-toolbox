import {AfterViewInit, Component, inject} from '@angular/core';
import {FightSimulatorService} from "../../service/fight-simulator.service";
import {DarkgalaxyApiService} from "../../../../darkgalaxy-ui-parser/service/darkgalaxy-api.service";
import {Fleet} from "../../../../../shared/model/fleet/fleet.model";
import {FleetScoreService} from "../../service/fleet-score.service";

@Component({
  selector: 'dgt-fleet-scan-details',
  templateUrl: './fleet-scan-details.component.html',
  styleUrls: ['./fleet-scan-details.component.css']
})
export class FleetScanDetailsComponent implements AfterViewInit {
  private fightSimulatorService: FightSimulatorService = inject(FightSimulatorService);
  private fleetScoreService: FleetScoreService = inject(FleetScoreService);
  private dgAPI: DarkgalaxyApiService = inject(DarkgalaxyApiService);

  url: string = "https://helloweenpt.com/darkgalaxy/combat-simulator";

  ngAfterViewInit() {
    const fleets: Fleet[] = this.dgAPI.fleetScan();

    this.fleetScoreService.applyFleetScore(fleets);
    this.fightSimulatorService.createSimulation(fleets);
  }
}
