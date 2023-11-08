import { NgModule } from '@angular/core';
import { AdminPanelComponent } from './component/admin-panel/admin-panel.component';
import {BrowserModule} from "@angular/platform-browser";
import { HttpClientModule} from "@angular/common/http";



@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  declarations: [
    AdminPanelComponent
  ],
  bootstrap: [
    AdminPanelComponent
  ]
})
export class LoadDataModule { }
