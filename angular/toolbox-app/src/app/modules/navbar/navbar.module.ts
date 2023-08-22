import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MenuComponent} from './component/menu-replacement/menu.component';
import {FaIconLibrary, FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {BrowserModule} from "@angular/platform-browser";
import {
    faEarthAmericas as fasEarthAmericas,
    faFlaskVial as fasFlaskVial,
    faHandFist as fasHandFist,
    faHouseChimney as fasHouseChimney,
    faSatelliteDish as fasSatelliteDish,
    faShuttleSpace as fasShuttleSpace,
    faTableCells as fasTableCells
} from "@fortawesome/free-solid-svg-icons";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {ApplicationRoutingModule} from "../application-routing/application-routing.module";

@NgModule({
    declarations: [
        MenuComponent
    ],
    imports: [
        CommonModule,
        BrowserModule,
        FontAwesomeModule,
        RouterLinkActive,
        RouterLink,
        ApplicationRoutingModule
    ],
    exports: [
        MenuComponent
    ]
})
export class NavbarModule {
    constructor(library: FaIconLibrary) {
        library.addIcons(fasHouseChimney, fasEarthAmericas, fasSatelliteDish, fasShuttleSpace, fasTableCells, fasFlaskVial, fasHandFist);
    }
}
