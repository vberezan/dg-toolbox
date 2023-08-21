import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MenuComponent} from './component/menu-replacement/menu.component';


@NgModule({
    declarations: [
        MenuComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        MenuComponent
    ]
})
export class NavbarModule {
}
