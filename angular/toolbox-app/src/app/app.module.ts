import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {NavbarModule} from "./modules/navbar/navbar.module";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NavbarModule,
    RouterLink,
    RouterLinkActive,
    TranslateModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    console.log('----------------------------------------------------------------');
    console.log('---------------------- DarkGalaxy Toolbox ----------------------');
    console.log('----------------------------------------------------------------');
    console.log('------------------------ Main Features: ------------------------');
    console.log('----- 1. Fix styling glitches ----------------------------------');
    console.log('----- 2. Provide a modern alternative to the game navbar  ------');
    console.log('----------------------------------------------------------------');
  }
}
