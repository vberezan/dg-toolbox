import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MenuComponent} from './component/menu-replacement/menu.component';
import {FaIconLibrary, FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {BrowserModule} from "@angular/platform-browser";
import {faHouseChimney as fasHouseChimney} from "@fortawesome/free-solid-svg-icons";
import {faEarthAmericas as fasEarthAmericas} from "@fortawesome/free-solid-svg-icons";


@NgModule({
    declarations: [
        MenuComponent
    ],
    imports: [
        CommonModule,
        BrowserModule,
        FontAwesomeModule
    ],
    exports: [
        MenuComponent
    ]
})
export class NavbarModule {
    constructor(library: FaIconLibrary) {
        library.addIcons(fasHouseChimney, fasEarthAmericas);
    }
}
