import {Component, inject} from '@angular/core';
import {NavigationMatrixService} from "../../service/navigation-matrix.service";

@Component({
    selector: 'dgt-admin-load-data-panel',
    templateUrl: './admin-panel.component.html',
    styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent {
    private navigationMatrixService: NavigationMatrixService = inject(NavigationMatrixService);
    protected controls: {
        galaxies: string
    } = {
        galaxies: ''
    }

    async execute(galaxies: number[]): Promise<void> {
        return this.navigationMatrixService.extractGalaxies(galaxies);
    }

    async scanGalaxies(): Promise<void> {
        await this.execute(this.controls.galaxies.trim().split(',').map(function (item: string) {
            return parseInt(item, 10);
        }));
    }
}
