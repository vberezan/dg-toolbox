import { NgModule } from '@angular/core';
import { AdminPanelComponent } from './component/admin-panel/admin-panel.component';
import {BrowserModule} from "@angular/platform-browser";
import { HttpClientModule} from "@angular/common/http";
import { AllianceListDirective } from './directive/alliance-list.directive';
import {FormsModule} from "@angular/forms";



@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  declarations: [
    AdminPanelComponent,
    AllianceListDirective
  ],
  bootstrap: [
    AdminPanelComponent
  ]
})
export class LoadDataModule { }
