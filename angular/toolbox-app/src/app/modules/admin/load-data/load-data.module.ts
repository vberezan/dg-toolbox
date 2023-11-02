import { NgModule } from '@angular/core';
import { AdminPanelComponent } from './component/admin-panel/admin-panel.component';
import {BrowserModule} from "@angular/platform-browser";



@NgModule({
  imports: [
    BrowserModule
  ],
  declarations: [
    AdminPanelComponent
  ],
  bootstrap: [
    AdminPanelComponent
  ]
})
export class LoadDataModule { }
