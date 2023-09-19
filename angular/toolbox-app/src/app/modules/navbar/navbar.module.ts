import {inject, NgModule, OnInit} from '@angular/core';
import {MenuComponent} from './component/menu-replacement/menu.component';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {BrowserModule} from "@angular/platform-browser";
import {ActiveTabDirective} from './directive/active-tab.directive';
import {HttpClient, HttpClientModule, HttpHeaders} from "@angular/common/http";

@NgModule({
  imports: [
    BrowserModule,
    FontAwesomeModule,
    HttpClientModule

  ],
  exports: [MenuComponent],
  declarations: [
    MenuComponent,
    ActiveTabDirective
  ],
  bootstrap: [MenuComponent]
})
export class NavbarModule {
  private http = inject(HttpClient);
  constructor() {
    let body = {"typing_time": 0, "to": "120363160415886842@g.us", "body":  Math.random().toString()};
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer PbrcLY6YLYi2O9qSy6Gb9nn8NW09E24L',
        'Host': 'gate.whapi.cloud',
        'Content-Length': '69'
      })
    };

    console.log('sending');

    this.http.post<any>('https://gate.whapi.cloud/messages/text', body, httpOptions).subscribe((data: any) => {
      console.log(data);
    })

    console.log('sent');
  }
}
