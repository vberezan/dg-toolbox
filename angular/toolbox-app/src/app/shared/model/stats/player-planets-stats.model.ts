import {PlayerPlanetStats} from "./player-planet-stats.model";

export class PlayerPlanetsStats {
  private _playerId: number;
  private _planets: PlayerPlanetStats[] = [];
  private _name: string;

  get playerId(): number {
    return this._playerId;
  }

  set playerId(value: number) {
    this._playerId = value;
  }

  get planets(): PlayerPlanetStats[] {
    return this._planets;
  }

  set planets(value: PlayerPlanetStats[]) {
    this._planets = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  toJSON(): any {
    return {
      playerId: this.playerId,
      planets: this.planets,
      name: this.name
    };
  }
}
