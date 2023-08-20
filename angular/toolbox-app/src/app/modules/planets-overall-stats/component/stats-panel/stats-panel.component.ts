import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';

@Component({
    selector: 'dg-toolbox-stats-panel',
    templateUrl: './stats-panel.component.html',
    styleUrls: ['./stats-panel.component.css']
})
export class StatsPanelComponent implements AfterViewInit {
    @ViewChild("testView", {static: false}) element: ElementRef;

    ngAfterViewInit(): void {
        console.log(this.element.nativeElement)
    }
}
