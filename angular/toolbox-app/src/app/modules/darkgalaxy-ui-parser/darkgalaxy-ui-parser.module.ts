import {NgModule} from '@angular/core';
import {DarkgalaxyApiService} from "./service/darkgalaxy-api.service";
import {PlanetListExtractorService} from "./service/planet-list.extractor.service";
import {PlanetScanExtractorService} from "./service/planet-scan.extractor.service";
import {NavigationSystemPlanetsExtractorService} from "./service/navigation-system-planets.extractor.service";
import {BrowserModule} from "@angular/platform-browser";


@NgModule({
    declarations: [],
    exports: [],
    providers: [
        PlanetListExtractorService,
        PlanetScanExtractorService,
        NavigationSystemPlanetsExtractorService,
        DarkgalaxyApiService
    ],
    imports: [BrowserModule]
})
export class DarkgalaxyUiParserModule {
}
