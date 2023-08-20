import {AfterViewInit, Component, Inject, Renderer2} from '@angular/core';
import {DOCUMENT} from "@angular/common";

@Component({
    selector: 'dg-toolbox-stats-panel',
    templateUrl: './stats-panel.component.html',
    styleUrls: ['./stats-panel.component.css']
})
export class StatsPanelComponent implements AfterViewInit {
    constructor(@Inject(DOCUMENT) private document: any) {

    }

    ngAfterViewInit(): void {
        console.log(this.document.querySelector('[id=planetList]'))
    }
}
