import {ResourceStats} from "./resource-stats.model";
import {PopulationStats} from "./population-stats.model";

export class PlanetStats {
    private _resources: ResourceStats = new ResourceStats();
    private _workers: PopulationStats = new PopulationStats();
    private _soldiers: PopulationStats = new PopulationStats();


    get resources(): ResourceStats {
        return this._resources;
    }

    set resources(value: ResourceStats) {
        this._resources = value;
    }

    get workers(): PopulationStats {
        return this._workers;
    }

    set workers(value: PopulationStats) {
        this._workers = value;
    }


    get soldiers(): PopulationStats {
        return this._soldiers;
    }

    set soldiers(value: PopulationStats) {
        this._soldiers = value;
    }
}
