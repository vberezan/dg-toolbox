import {NgModule} from '@angular/core';
import {PlanetListExtractorService} from "./service/planet-list.extractor.service";
import {PlanetScanExtractorService} from "./service/planet-scan.extractor.service";
import {NavigationSystemPlanetsExtractorService} from "./service/navigation-system-planets.extractor.service";
import {BrowserModule} from "@angular/platform-browser";
import {AllianceMembersService} from "./service/alliance-members.service";


@NgModule({
  imports: [BrowserModule],
  providers: [
    PlanetListExtractorService,
    PlanetScanExtractorService,
    NavigationSystemPlanetsExtractorService,
    AllianceMembersService
  ]
})
export class DarkgalaxyUiParserModule {
}
