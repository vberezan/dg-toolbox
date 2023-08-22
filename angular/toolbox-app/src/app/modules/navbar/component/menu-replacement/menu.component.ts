import {AfterViewInit, Component, inject, Renderer2} from '@angular/core';

@Component({
    selector: 'dg-toolbox-navbar',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.css']
})
export class MenuComponent implements AfterViewInit {
    private renderer: Renderer2 = inject(Renderer2);
    ngAfterViewInit(): void {
        this.renderer.setStyle(document.body,'visibility','visible');
    }

}
