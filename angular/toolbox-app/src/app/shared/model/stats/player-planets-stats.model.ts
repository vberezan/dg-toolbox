import {PlayerPlanetsBatch} from "./player-planet-stats.model";

export class PlayerPlanetsStats {
  private _playerId: number;
  private _planets: PlayerPlanetsBatch[] = [];
  private _name: string;
  private _turn: number;
  private _total: number;


  get turn(): number {
    return this._turn;
  }

  set turn(value: number) {
    this._turn = value;
  }

  get total(): number {
    return this._total;
  }

  set total(value: number) {
    this._total = value;
  }

  get playerId(): number {
    return this._playerId;
  }

  set playerId(value: number) {
    this._playerId = value;
  }

  get planets(): PlayerPlanetsBatch[] {
    return this._planets;
  }

  set planets(value: PlayerPlanetsBatch[]) {
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
