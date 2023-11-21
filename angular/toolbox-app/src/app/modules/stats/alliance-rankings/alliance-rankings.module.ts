import {NgModule} from '@angular/core';
import {RankingsPanelComponent} from './component/rankings-panel/rankings-panel.component';
import {BrowserModule} from "@angular/platform-browser";


@NgModule({
  imports: [
    BrowserModule
  ],
  declarations: [
    RankingsPanelComponent
  ],
  bootstrap: [
    RankingsPanelComponent
  ]
})
export class AllianceRankingsModule { }
