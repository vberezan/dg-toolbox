import {NgModule} from '@angular/core';
import {ActivatedRouteSnapshot, RouterModule, RouterStateSnapshot, Routes} from "@angular/router";
import {MenuComponent} from "../navbar/component/menu-replacement/menu.component";
import {StatsPanelComponent} from "../planets-list-stats/component/stats-panel/stats-panel.component";


const routes: Routes = [{
    path: '', children: [
        {
            path: 'planets', component: MenuComponent, resolve: {
                url: 'externalUrlRedirectResolver'
            },
            data: {
                externalUrl: '/planets/'
            }
        },
        {
            path: 'radar', component: MenuComponent, resolve: {
                url: 'externalUrlRedirectResolver'
            },
            data: {
                externalUrl: '/radar/'
            }
        },
        {
            path: 'fleets', component: MenuComponent, resolve: {
                url: 'externalUrlRedirectResolver'
            },
            data: {
                externalUrl: '/fleets/'
            }
        },
        {
            path: 'navigation', component: MenuComponent, resolve: {
                url: 'externalUrlRedirectResolver'
            },
            data: {
                externalUrl: '/navigation/'
            }
        },
        {
            path: 'research', component: MenuComponent, resolve: {
                url: 'externalUrlRedirectResolver'
            },
            data: {
                externalUrl: '/research/'
            }
        },
        {
            path: 'alliances', component: MenuComponent, resolve: {
                url: 'externalUrlRedirectResolver'
            },
            data: {
                externalUrl: '/alliances/'
            }
        }
    ]
}, {
    path: '', children: [{
        path: 'planets', component: StatsPanelComponent
    }]
}];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    providers: [{
        provide: 'externalUrlRedirectResolver',
        useValue: (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
            console.log(window.location.pathname);
            console.log((route.data as any).externalUrl)


            if (window.location.pathname != (route.data as any).externalUrl) {
                window.location.href = (route.data as any).externalUrl;
            }
        }
    }],
    exports: [RouterModule]
})
export class ApplicationRoutingModule {
}
