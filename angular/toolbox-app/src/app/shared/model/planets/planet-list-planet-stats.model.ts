import {ResourceStats} from "./planet-list-resource-stats.model";
import {PopulationStats} from "./planet-list-population-stats.model";

export class PlanetStats {
  private _resources: ResourceStats = new ResourceStats();
  private _workers: PopulationStats = new PopulationStats();
  private _soldiers: PopulationStats = new PopulationStats();
  private _count: number;

  get count(): number {
    return this._count;
  }

  set count(value: number) {
    this._count = value;
  }

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
