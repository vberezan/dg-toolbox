import {Resource} from "./base/resource.model";
import {Population} from "./base/population.model";

export class PlanetSummary {
    private _location: string[];
    private _name: string;
    private _resources: Resource[] = [];
    private _ground: number = 0;
    private _orbit: number = 0;
    private _worker: Population = new Population();
    private _soldier: Population = new Population();


    get location(): string[] {
        return this._location;
    }

    set location(value: string[]) {
        this._location = value;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get resources(): Resource[] {
        return this._resources;
    }

    set resources(value: Resource[]) {
        this._resources = value;
    }

    get ground(): number {
        return this._ground;
    }

    set ground(value: number) {
        this._ground = value;
    }

    get orbit(): number {
        return this._orbit;
    }

    set orbit(value: number) {
        this._orbit = value;
    }

    get worker(): Population {
        return this._worker;
    }

    set worker(value: Population) {
        this._worker = value;
    }

    get soldier(): Population {
        return this._soldier;
    }

    set soldier(value: Population) {
        this._soldier = value;
    }
}
