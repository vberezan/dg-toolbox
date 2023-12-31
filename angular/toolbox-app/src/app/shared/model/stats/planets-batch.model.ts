export class PlanetsBatch {
  private _galaxy: number;
  private _total: number;
  private _planets: string[] = [];
  private _metalProduction: number = 0;
  private _mineralProduction: number = 0;
  private _foodProduction: number = 0;
  private _requiredSoldiers: number = 0;


  constructor(galaxy: number, planets: string[], total: number) {
    this._galaxy = galaxy;
    this._planets = planets;
    this._total = total;
  }

  get requiredSoldiers(): number {
    return this._requiredSoldiers;
  }

  set requiredSoldiers(value: number) {
    this._requiredSoldiers = value;
  }

  get metalProduction(): number {
    return this._metalProduction;
  }

  set metalProduction(value: number) {
    this._metalProduction = value;
  }

  get mineralProduction(): number {
    return this._mineralProduction;
  }

  set mineralProduction(value: number) {
    this._mineralProduction = value;
  }

  get foodProduction(): number {
    return this._foodProduction;
  }

  set foodProduction(value: number) {
    this._foodProduction = value;
  }

  get galaxy(): number {
    return this._galaxy;
  }

  set galaxy(value: number) {
    this._galaxy = value;
  }

  get planets(): string[] {
    return this._planets;
  }

  set planets(value: string[]) {
    this._planets = value;
  }

  get total(): number {
    return this._total;
  }

  set total(value: number) {
    this._total = value;
  }

  toJSON(): any {
    return {
      galaxy: this.galaxy,
      planets: this.planets,
      total: this.total,
      metalProduction: this.metalProduction,
      mineralProduction: this.mineralProduction,
      foodProduction: this.foodProduction,
      requiredSoldiers: this.requiredSoldiers
    };
  }
}
