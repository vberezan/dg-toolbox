import {AfterViewInit, Component, inject} from '@angular/core';
import {FightSimulatorService} from "../../service/fight-simulator.service";

@Component({
  selector: 'dgt-fleet-scan-details',
  templateUrl: './fleet-scan-details.component.html',
  styleUrls: ['./fleet-scan-details.component.css']
})
export class FleetScanDetailsComponent implements AfterViewInit {
  private fightSimulatorService: FightSimulatorService = inject(FightSimulatorService);

  url: string = "https://helloweenpt.com/darkgalaxy/combat-simulator";

  ngAfterViewInit() {
    this.fightSimulatorService.createSimulation();
  }
}
