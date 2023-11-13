import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {NavbarModule} from "./app/modules/navbar/navbar.module";
import {PlanetListStatsModule} from "./app/modules/planets/planet-list-stats/planet-list-stats.module";
import {SharedScansModule} from "./app/modules/scans/shared-scans/shared-scans.module";
import {NavigationScansModule} from "./app/modules/scans/navigation-scans/navigation-scans.module";
import {AuthenticationModule} from "./app/modules/authentication/authentication.module";
import {PlatformRef} from "@angular/core";
import {AllianceOrdersManagerModule} from "./app/modules/alliances/alliance-orders-manager/alliance-orders-manager.module";
import {DarkgalaxyUiParserModule} from "./app/modules/darkgalaxy-ui-parser/darkgalaxy-ui-parser.module";
import {LocalStorageManagerModule} from "./app/modules/local-storage-manager/local-storage-manager.module";
import {ChangelogModule} from "./app/modules/changelog/changelog.module";
import {LoadDataModule} from "./app/modules/admin/load-data/load-data.module";

const platform: PlatformRef = platformBrowserDynamic();
let windowURL: string[] = window.location.pathname.split(/\//g);
platform.bootstrapModule(LocalStorageManagerModule).catch(err => console.error(err));
platform.bootstrapModule(DarkgalaxyUiParserModule).catch(err => console.error(err));
platform.bootstrapModule(AuthenticationModule).catch(err => console.error(err));
platform.bootstrapModule(NavbarModule).catch(err => console.error(err));


// -- home screen
if (windowURL.length === 2 && windowURL[1].trim().length === 0) {
  platform.bootstrapModule(ChangelogModule).catch(err => console.error(err));
  platform.bootstrapModule(LoadDataModule).catch(err => console.error(err));
}

// -- planets list screen
if (windowURL[1] === 'planets') {
  platform.bootstrapModule(PlanetListStatsModule).catch(err => console.error(err));
}

// -- planet screen >> comms
if (windowURL[1] === 'planet' && (windowURL.length === 5 && windowURL[3]) === 'comms') {
  platform.bootstrapModule(SharedScansModule).catch(err => console.error(err));
}

// -- navigation screen >> system level
if (windowURL[1] === 'navigation' && (windowURL.length === 6 && !isNaN(+windowURL[2]) && !isNaN(+windowURL[3]) && !isNaN(+windowURL[4]))) {
  platform.bootstrapModule(NavigationScansModule).catch(err => console.error(err));
}

// -- alliances
if (windowURL[1] === 'alliances') {
  platform.bootstrapModule(AllianceOrdersManagerModule).catch(err => console.error(err));
}
