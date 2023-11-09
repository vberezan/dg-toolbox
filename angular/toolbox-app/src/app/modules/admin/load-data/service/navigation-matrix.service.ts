import {inject, Injectable, Optional} from '@angular/core';
import {firstValueFrom} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class NavigationMatrixService {
    private httpClient: HttpClient = inject(HttpClient);
    private readonly GALAXIES: number = 49;
    private readonly G1_SECTORS: number = 25;
    private readonly INNER_SECTORS: number = 6;
    private readonly OUTER_SECTORS: number = 2;
    private readonly SYSTEMS: number = 4;

    constructor() {
    }

    private delay = async (ms: number) => new Promise(res => setTimeout(res, ms));

    async extractGalaxies(@Optional() galaxies: number[] = []): Promise<void> {
        let scanGalaxies: number[] = galaxies.length > 0 ? [...galaxies] : [...this.allGalaxies()];

        for (let g: number = 1; g <= scanGalaxies.length; g++) {
            if (g === 1) {
                for (let se: number = 1; se <= this.G1_SECTORS; se++) {
                    for (let sy: number = 1; sy <= this.SYSTEMS; sy++) {
                        await this.extractData(g, se, sy);
                    }
                }
            }

            if (g > 1 && g < 14) {
                for (let se: number = 1; se <= this.INNER_SECTORS; se++) {
                    for (let sy: number = 1; sy <= this.SYSTEMS; sy++) {
                        await this.extractData(g, se, sy);
                    }
                }
            }

            if (g >= 14) {
                for (let se: number = 1; se <= this.OUTER_SECTORS; se++) {
                    for (let sy: number = 1; sy <= this.SYSTEMS; sy++) {
                        await this.extractData(g, se, sy);
                    }
                }
            }
        }
    }

    private allGalaxies(): number[] {
        let result: number[] = [];

        for (let i = 1; i <= this.GALAXIES; i++) {
            result.push(i);
        }

        return result
    }

    private async extractData(galaxy: number, sector: number, system: number): Promise<void> {
        const delayMs:number = Math.random() * 5000;

        console.log("Extracting system " + galaxy + '.' + sector + '.' + system + ' after a delay of ' + delayMs + 'ms');

        await this.delay(delayMs);

        let source: string = await firstValueFrom(this.httpClient.get('https://andromeda.darkgalaxy.com/navigation/' + galaxy + '/' + sector + '/' + system, {responseType: 'text'}));

        let dp: DOMParser = new DOMParser();
        let dd: Document = dp.parseFromString(source, 'text/html');
        dd.querySelectorAll('.navigation .planets').forEach(planet => {
            let display: string = planet.querySelector('.coords span').textContent.trim() + ' - ';

            if (planet.classList.contains('neutral')) {
                display += 'Uninhabited';
            } else {
                if (planet.querySelector('.allianceName')) {
                    display += planet.querySelector('.allianceName').textContent.trim();
                }

                display += planet.querySelector('.playerName').textContent.trim();
            }

            console.log(display);
        });
    }
}
