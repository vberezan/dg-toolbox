import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {NavbarModule} from "./app/modules/navbar/navbar.module";
import {PlanetsListStatsModule} from "./app/modules/planets-list-stats/planets-list-stats.module";

const platform = platformBrowserDynamic();

platform.bootstrapModule(NavbarModule).catch(err => console.error(err));

if (window.location.pathname == '/planets') {
    platform.bootstrapModule(PlanetsListStatsModule).catch(err => console.error(err));
}

