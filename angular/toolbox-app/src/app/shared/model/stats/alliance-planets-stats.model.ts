import {PlanetsBatch} from "./planets-batch.model";

export class AlliancePlanetsStats {
  private _planets: PlanetsBatch[] = [];
  private _turn: number;
  private _total: number;
  private _tag: string;

  get tag(): string {
    return this._tag;
  }

  set tag(value: string) {
    this._tag = value;
  }

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

  get planets(): PlanetsBatch[] {
    return this._planets;
  }

  set planets(value: PlanetsBatch[]) {
    this._planets = value;
  }

  toJSON(): any {
    return {
      tag: this.tag,
      planets: this.planets,
      turn: this.turn,
      total: this.total
    };
  }
}
