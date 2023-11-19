import {Component, inject, OnInit} from '@angular/core';
import {StatsPanel} from "../../../../../shared/model/planets/planet-list-stats-panel.model";
import {StatsPanelService} from "../../service/stats-panel.service";

@Component({
  selector: 'dgt-planet-list-stats-panel',
  templateUrl: './stats-panel.component.html',
  styleUrls: ['./stats-panel.component.css']
})
export class StatsPanelComponent implements OnInit {
  protected panel: StatsPanel;
  private statsPanelService: StatsPanelService = inject(StatsPanelService);

  ngOnInit() {
    this.panel = this.statsPanelService.extractStats();
  }

}
