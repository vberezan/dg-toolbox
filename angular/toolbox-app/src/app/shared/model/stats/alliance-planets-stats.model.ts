import {PlanetsBatch} from "./planets-batch.model";

export class AlliancePlanets {
  private _planets: PlanetsBatch[] = [];
  private _turn: number;
  private _total: number;
  private _g1Total: number = 0;
  private _g213Total: number = 0;
  private _g1449Total: number = 0;
  private _tag: string;
  private _totalMetalProduction: number = 0;
  private _totalMineralProduction: number = 0;
  private _totalFoodProduction: number = 0;
  private _totalRequiredSoldiers: number = 0;

  get g1Total(): number {
    return this._g1Total;
  }

  set g1Total(value: number) {
    this._g1Total = value;
  }

  get g213Total(): number {
    return this._g213Total;
  }

  set g213Total(value: number) {
    this._g213Total = value;
  }

  get g1449Total(): number {
    return this._g1449Total;
  }

  set g1449Total(value: number) {
    this._g1449Total = value;
  }

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
      totalRequiredSoldiers: this.totalRequiredSoldiers,
      g1Total: this.g1Total,
      g213Total: this.g213Total,
      g1449Total: this.g1449Total
    };
  }
}
