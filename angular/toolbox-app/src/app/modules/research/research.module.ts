import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResearchPanelComponent } from './component/research-panel/research-panel.component';
import {BrowserModule} from "@angular/platform-browser";



@NgModule({
  imports: [
    BrowserModule,
  ],
  declarations: [
    ResearchPanelComponent
  ],
  bootstrap: [
    ResearchPanelComponent
  ]
})
export class ResearchModule { }
