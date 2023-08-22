import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {MenuComponent} from "../navbar/component/menu-replacement/menu.component";


const routes: Routes = [{
    path: '', children: [
        {path: 'planets', component: MenuComponent},
        {path: 'radar', component: MenuComponent},
        {path: 'fleets', component: MenuComponent},
        {path: 'navigation', component: MenuComponent},
        {path: 'research', component: MenuComponent},
        {path: 'alliances', component: MenuComponent}
    ]
}];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class ApplicationRoutingModule {
}
