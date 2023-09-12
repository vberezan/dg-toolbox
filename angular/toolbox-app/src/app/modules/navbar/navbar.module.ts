import {NgModule, OnInit} from '@angular/core';
import {MenuComponent} from './component/menu-replacement/menu.component';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {BrowserModule} from "@angular/platform-browser";
import {ActiveTabDirective} from './directive/active-tab.directive';

@NgModule({
    declarations: [
        MenuComponent,
        ActiveTabDirective
    ],
    imports: [
        BrowserModule,
        FontAwesomeModule
    ],
    exports: [MenuComponent],
    bootstrap: [MenuComponent]
})
export class NavbarModule implements OnInit {
    constructor() {
    }

    ngOnInit(): void {
    }

}
