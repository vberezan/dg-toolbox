import {ResourceStats} from "./planet-list-resource-stats.model";
import {PopulationStats} from "./planet-list-population-stats.model";

export class PlanetStats {
  private _resources: ResourceStats = new ResourceStats();

  get resources(): ResourceStats {
    return this._resources;
  }

  set resources(value: ResourceStats) {
    this._resources = value;
  }

  private _workers: PopulationStats = new PopulationStats();

  get workers(): PopulationStats {
    return this._workers;
  }

  set workers(value: PopulationStats) {
    this._workers = value;
  }

  private _soldiers: PopulationStats = new PopulationStats();

  get soldiers(): PopulationStats {
    return this._soldiers;
  }

  set soldiers(value: PopulationStats) {
    this._soldiers = value;
  }
}
