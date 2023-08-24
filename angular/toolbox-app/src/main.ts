import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {NavbarModule} from "./app/modules/navbar/navbar.module";
import {PlanetsListStatsModule} from "./app/modules/planets-list-stats/planets-list-stats.module";
import {ScansInCloudModule} from "./app/modules/scans-in-cloud/scans-in-cloud.module";

const platform = platformBrowserDynamic();
let windowURL = window.location.pathname.split(/\//g);
platform.bootstrapModule(NavbarModule).catch(err => console.error(err));

// if (windowURL[1] === 'planets') {
//   platform.bootstrapModule(PlanetsListStatsModule).catch(err => console.error(err));
// }

if (windowURL[1] === 'planet' && (windowURL.length === 5 && windowURL[3]) === 'comms') {
  platform.bootstrapModule(ScansInCloudModule).catch(err => console.error(err));
}
