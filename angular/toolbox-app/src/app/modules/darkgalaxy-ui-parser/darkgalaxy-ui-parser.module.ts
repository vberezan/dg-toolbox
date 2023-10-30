import {NgModule} from '@angular/core';
import {BrowserModule} from "@angular/platform-browser";
import {DarkgalaxyUiParserComponent} from './component/darkgalaxy-ui-placeholder/darkgalaxy-ui-parser.component';


@NgModule({
  imports: [BrowserModule],
  declarations: [
    DarkgalaxyUiParserComponent
  ],
  bootstrap: [
    DarkgalaxyUiParserComponent
  ]
})
export class DarkgalaxyUiParserModule {
}
