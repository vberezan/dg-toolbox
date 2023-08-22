import {Directive, HostBinding, Input, OnInit} from '@angular/core';

@Directive({
    selector: '[dgtActiveTab]'
})
export class ActiveTabDirective implements OnInit {
    @Input('tabName') tabName: string;
    @HostBinding('class.active') isActive: boolean = false;

    ngOnInit(): void {
        switch (this.tabName) {
            case 'home': {

                if (window.location.pathname.split(/\//g)[1] === '') {
                    this.isActive = true;
                }
                break;
            }
            case 'planets': {
                if (['planets','planet'].includes(window.location.pathname.split(/\//g)[1])) {
                    this.isActive = true;
                }

                break;
            }
            case 'radar': {
                if (['radar'].includes(window.location.pathname.split(/\//g)[1])) {
                    this.isActive = true;
                }

                break;
            }
            case 'fleets': {
                if (['fleets', 'fleet'].includes(window.location.pathname.split(/\//g)[1])) {
                    this.isActive = true;
                }

                break;
            }
            case 'navigation': {
                if (['navigation'].includes(window.location.pathname.split(/\//g)[1])) {
                    this.isActive = true;
                }

                break;
            }
            case 'research': {
                if (['research'].includes(window.location.pathname.split(/\//g)[1])) {
                    this.isActive = true;
                }

                break;
            }
            case 'alliances': {
                if (['alliances'].includes(window.location.pathname.split(/\//g)[1])) {
                    this.isActive = true;
                }

                break;
            }
        }
    }

}
