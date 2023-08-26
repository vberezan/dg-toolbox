import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {NavbarModule} from "./app/modules/navbar/navbar.module";
import {PlanetListStatsModule} from "./app/modules/planet-list-stats/planet-list-stats.module";
import {SharedScansModule} from "./app/modules/shared-scans/shared-scans.module";

const platform = platformBrowserDynamic();
let windowURL = window.location.pathname.split(/\//g);
platform.bootstrapModule(NavbarModule).catch(err => console.error(err));

if (windowURL[1] === 'planets') {
  platform.bootstrapModule(PlanetListStatsModule).catch(err => console.error(err));
}

if (windowURL[1] === 'planet' && (windowURL.length === 5 && windowURL[3]) === 'comms') {
  platform.bootstrapModule(SharedScansModule).catch(err => console.error(err));
}
