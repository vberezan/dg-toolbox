import {PlanetsBatch} from "./planets-batch.model";

export class PlayerPlanets {
  private _playerId: number;
  private _planets: PlanetsBatch[] = [];
  private _name: string;
  private _turn: number;
  private _total: number;
  private _g1Planets: number;
  private _g213Planets: number;
  private _g1449Planets: number;

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

  get planets(): PlanetsBatch[] {
    return this._planets;
  }

  set planets(value: PlanetsBatch[]) {
    this._planets = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get g1Planets(): number {
    return this._g1Planets;
  }

  set g1Planets(value: number) {
    this._g1Planets = value;
  }

  get g213Planets(): number {
    return this._g213Planets;
  }

  set g213Planets(value: number) {
    this._g213Planets = value;
  }

  get g1449Planets(): number {
    return this._g1449Planets;
  }

  set g1449Planets(value: number) {
    this._g1449Planets = value;
  }

  toJSON(): any {
    return {
      playerId: this.playerId,
      planets: this.planets,
      name: this.name,
      turn: this.turn,
      total: this.total,
      g1Planets: this.g1Planets,
      g213Planets: this.g213Planets,
      g1449Planets: this.g1449Planets
    };
  }
}
