import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangelogComponent } from './component/changelog/changelog.component';



@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ChangelogComponent
  ],
  bootstrap: [
    ChangelogComponent
  ]
})
export class ChangelogModule { }
