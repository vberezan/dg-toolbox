import {AfterViewInit, Component, inject, Renderer2} from '@angular/core';
import {FaIconLibrary} from "@fortawesome/angular-fontawesome";
import {
    faEarthAmericas as fasEarthAmericas,
    faFlaskVial as fasFlaskVial,
    faHandFist as fasHandFist,
    faHouseChimney as fasHouseChimney,
    faSatelliteDish as fasSatelliteDish,
    faJetFighterUp as fasJetFighterUp,
    faChessBoard as fasChessBoard
} from "@fortawesome/free-solid-svg-icons";

@Component({
    selector: 'dg-toolbox-navbar',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.css']
})
export class MenuComponent implements AfterViewInit {
    private renderer: Renderer2 = inject(Renderer2);

    constructor(library: FaIconLibrary) {
        library.addIcons(fasHouseChimney, fasEarthAmericas, fasSatelliteDish, fasJetFighterUp, fasChessBoard, fasFlaskVial, fasHandFist);
    }

    ngAfterViewInit(): void {
        this.renderer.setStyle(document.body, 'visibility', 'visible');
    }
}
