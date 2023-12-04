import {PlanetsBatch} from "./planets-batch.model";

export class AlliancePlanets {
  private _planets: PlanetsBatch[] = [];
  private _turn: number;
  private _total: number;
  private _tag: string;
  private _totalMetalProduction: number = 0;
  private _totalMineralProduction: number = 0;
  private _totalFoodProduction: number = 0;
  private _totalRequiredSoldiers: number = 0;

  get totalRequiredSoldiers(): number {
    return this._totalRequiredSoldiers;
  }

  set totalRequiredSoldiers(value: number) {
    this._totalRequiredSoldiers = value;
  }

  get totalMetalProduction(): number {
    return this._totalMetalProduction;
  }

  set totalMetalProduction(value: number) {
    this._totalMetalProduction = value;
  }

  get totalMineralProduction(): number {
    return this._totalMineralProduction;
  }

  set totalMineralProduction(value: number) {
    this._totalMineralProduction = value;
  }

  get totalFoodProduction(): number {
    return this._totalFoodProduction;
  }

  set totalFoodProduction(value: number) {
    this._totalFoodProduction = value;
  }

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
      total: this.total,
      totalMetalProduction: this.totalMetalProduction,
      totalMineralProduction: this.totalMineralProduction,
      totalFoodProduction: this.totalFoodProduction,
      totalRequiredSoldiers: this.totalRequiredSoldiers
    };
  }
}
