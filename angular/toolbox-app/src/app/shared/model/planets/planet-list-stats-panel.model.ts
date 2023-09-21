import {PlanetStats} from "./planet-list-planet-stats.model";

export class StatsPanel {
  private _stats: Map<String, PlanetStats> = new Map<String, PlanetStats>();

  get stats(): Map<String, PlanetStats> {
    return this._stats;
  }
  set stats(value: Map<String, PlanetStats>) {
    this._stats = value;
  }
}
