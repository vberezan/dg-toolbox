import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScanDataPanelComponent } from './component/scan-data-panel/scan-data-panel.component';



@NgModule({
  declarations: [
    ScanDataPanelComponent
  ],
  imports: [
    CommonModule
  ],
  bootstrap: [
    ScanDataPanelComponent
  ]
})
export class NavigationScansModule { }
