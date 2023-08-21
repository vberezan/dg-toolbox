import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DarkGalaxyAPIService} from "./service/dark-galaxy-api.service";
import {PlanetListService} from "./service/planet/planet-list.service";


@NgModule({
    declarations: [],
    exports: [
        DarkGalaxyAPIService
    ],
    providers: [
        PlanetListService,
        DarkGalaxyAPIService
    ],
    imports: [
        CommonModule
    ]
})
export class OriginalUiParserModule {
}
