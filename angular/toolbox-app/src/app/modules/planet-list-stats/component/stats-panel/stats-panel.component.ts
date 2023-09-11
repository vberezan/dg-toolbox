import {Component, inject, OnInit} from '@angular/core';
import {StatsPanel} from "../../../../model/planet-list/planet-list-stats-panel.model";
import {StatsPanelService} from "../../service/stats-panel.service";
import {FaIconLibrary} from "@fortawesome/angular-fontawesome";
import {
  faBolt as fasBolt,
  faCarrot as fasCarrot,
  faCoins as fasCoins,
  faPersonRifle as fasPersonRifle,
  faSatellite as fasSatellite,
  faTreeCity as fasTreeCity,
  faDiceD20 as fasDiceD20
} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'dgt-planet-list-stats-panel',
  templateUrl: './stats-panel.component.html',
  styleUrls: ['./stats-panel.component.css']
})
export class StatsPanelComponent implements OnInit {
  protected panel: StatsPanel;
  private statsPanelService: StatsPanelService = inject(StatsPanelService);

  constructor(library: FaIconLibrary) {
    library.addIcons(fasCarrot, fasCoins, fasBolt, fasSatellite, fasTreeCity, fasPersonRifle, fasDiceD20);
  }

  ngOnInit() {
    this.panel = this.statsPanelService.extractStats();
  }

}
