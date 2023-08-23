import {NgModule} from '@angular/core';

@NgModule({
  imports: [],
  providers: [],
  bootstrap: []
})
export class AppModule {
  constructor() {
    console.log("%cDarkGalaxy Toolbox", "font-size: 14px");
    console.log('%c• fix styling glitches (new)', "font-size: 10px;");
    console.log('%c• planets list statistics:', "font-size: 10px;");
    console.log('%c• total resources', "font-size: 10px; margin-left: 25px;");
    console.log('%c• per galaxy resources (new)', "font-size: 10px; margin-left: 25px;");
  }
}
