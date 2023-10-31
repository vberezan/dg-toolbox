import {NgModule} from '@angular/core';
import {ChangelogComponent} from './component/changelog/changelog.component';
import {BrowserModule} from "@angular/platform-browser";
import {ChangelogService} from "./service/changelog.service";


@NgModule({
  imports: [
    BrowserModule
  ],
  declarations: [
    ChangelogComponent
  ],
  providers: [
    ChangelogService
  ],
  bootstrap: [
    ChangelogComponent
  ]
})
export class ChangelogModule {
}
