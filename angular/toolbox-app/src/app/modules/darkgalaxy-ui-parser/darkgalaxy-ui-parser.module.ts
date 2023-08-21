import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DarkgalaxyApiService} from "./service/darkgalaxy-api.service";
import {PlanetListService} from "./service/planet-list/planet-list.service";


@NgModule({
    declarations: [],
    exports: [],
    providers: [
        PlanetListService,
        DarkgalaxyApiService
    ],
    imports: [
        CommonModule
    ]
})
export class DarkgalaxyUiParserModule {
}
