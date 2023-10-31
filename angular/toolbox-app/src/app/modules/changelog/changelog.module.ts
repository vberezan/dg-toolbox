import {NgModule} from '@angular/core';
import {ChangelogComponent} from './component/changelog/changelog.component';
import {BrowserModule} from "@angular/platform-browser";


@NgModule({
  imports: [
    BrowserModule
  ],
  declarations: [
    ChangelogComponent
  ],
  bootstrap: [
    ChangelogComponent
  ]
})
export class ChangelogModule {
}
