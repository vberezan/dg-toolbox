import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DarkgalaxyApiService} from "./service/darkgalaxy-api.service";
import {PlanetListExtractorService} from "./service/planet-list.extractor.service";
import {PlanetScanExtractorService} from "./service/planet-scan.extractor.service";


@NgModule({
  declarations: [],
  exports: [],
  providers: [
    PlanetListExtractorService,
    PlanetScanExtractorService,
    DarkgalaxyApiService
  ],
  imports: [CommonModule]
})
export class DarkgalaxyUiParserModule {
}
