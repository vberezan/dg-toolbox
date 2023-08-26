import {Component, inject, OnInit} from '@angular/core';
import {StatsPanel} from "../../../../model/planet-list/planet-list-stats-panel.model";
import {StatsPanelService} from "../../service/stats-panel/stats-panel.service";
import {FaIconLibrary} from "@fortawesome/angular-fontawesome";
import {
  faBolt as fasBolt,
  faCarrot as fasCarrot,
  faCoins as fasCoins,
  faCubesStacked as fasCubesStacked,
  faPersonRifle as fasPersonRifle,
  faSatellite as fasSatellite,
  faTreeCity as fasTreeCity
} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'dgt-stats-panel',
  templateUrl: './stats-panel.component.html',
  styleUrls: ['./stats-panel.component.css']
})
export class StatsPanelComponent implements OnInit {
  protected panel: StatsPanel;
  private statsPanelService: StatsPanelService = inject(StatsPanelService);

  constructor(library: FaIconLibrary) {
    library.addIcons(fasCubesStacked, fasCarrot, fasCoins, fasBolt, fasSatellite, fasTreeCity, fasPersonRifle);
  }

  ngOnInit() {
    this.panel = this.statsPanelService.extractStats();
  }

}
