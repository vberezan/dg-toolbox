import {Resource} from "./resource.model";

export class PlanetSummary {

    private _location: string[];
    private _name: string
    private _resources: Resource[];
    private _ground: number;
    private _orbit: number;


    constructor(name: string, resources: Resource[], ground: number, orbit: number, location: string[]) {
        this._location = location;
        this._name = name;
        this._resources = resources;
        this._ground = ground;
        this._orbit = orbit;
    }


    get location(): string[] {
        return this._location;
    }

    get name(): string {
        return this._name;
    }

    get resources(): Resource[] {
        return this._resources;
    }

    get ground(): number {
        return this._ground;
    }

    get orbit(): number {
        return this._orbit;
    }
}
