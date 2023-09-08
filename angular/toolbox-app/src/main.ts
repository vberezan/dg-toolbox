import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {NavbarModule} from "./app/modules/navbar/navbar.module";
import {PlanetListStatsModule} from "./app/modules/planet-list-stats/planet-list-stats.module";
import {SharedScansModule} from "./app/modules/shared-scans/shared-scans.module";
import {NavigationScansModule} from "./app/modules/navigation-scans/navigation-scans.module";

const platform = platformBrowserDynamic();
let windowURL = window.location.pathname.split(/\//g);
platform.bootstrapModule(NavbarModule).catch(err => console.error(err));

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
