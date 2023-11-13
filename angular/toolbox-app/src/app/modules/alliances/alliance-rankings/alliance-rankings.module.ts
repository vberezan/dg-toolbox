import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RankingsPanelComponent } from './component/rankings-panel/rankings-panel.component';



@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    RankingsPanelComponent
  ],
  bootstrap: [
    RankingsPanelComponent
  ]
})
export class AllianceRankingsModule { }
