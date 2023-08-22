import {NgModule} from '@angular/core';
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
import {ActiveTabDirective} from './directive/active-tab.directive';

@NgModule({
    declarations: [
        MenuComponent,
        ActiveTabDirective
    ],
    imports: [
        BrowserModule,
        FontAwesomeModule,
        RouterLinkActive,
        RouterLink
    ],
    exports: [MenuComponent],
    bootstrap: [MenuComponent]
})
export class NavbarModule {
    constructor(library: FaIconLibrary) {
        library.addIcons(fasHouseChimney, fasEarthAmericas, fasSatelliteDish, fasShuttleSpace, fasTableCells, fasFlaskVial, fasHandFist);
    }
}
