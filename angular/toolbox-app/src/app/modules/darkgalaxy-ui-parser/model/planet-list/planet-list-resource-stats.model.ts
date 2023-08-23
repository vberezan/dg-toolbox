export class ResourceStats {
  private _ground: number = 0;

  get ground(): number {
    return this._ground;
  }

  set ground(value: number) {
    this._ground = value;
  }

  private _orbit: number = 0;

  get orbit(): number {
    return this._orbit;
  }

  set orbit(value: number) {
    this._orbit = value;
  }

  private _metalQuantity: number = 0;

  get metalQuantity(): number {
    return this._metalQuantity;
  }

  set metalQuantity(value: number) {
    this._metalQuantity = value;
  }

  private _mineralQuantity: number = 0;

  get mineralQuantity(): number {
    return this._mineralQuantity;
  }

  set mineralQuantity(value: number) {
    this._mineralQuantity = value;
  }

  private _foodQuantity: number = 0;

  get foodQuantity(): number {
    return this._foodQuantity;
  }

  set foodQuantity(value: number) {
    this._foodQuantity = value;
  }

  private _energyQuantity: number = 0;

  get energyQuantity(): number {
    return this._energyQuantity;
  }

  set energyQuantity(value: number) {
    this._energyQuantity = value;
  }

  private _metalProduction: number = 0;

  get metalProduction(): number {
    return this._metalProduction;
  }

  set metalProduction(value: number) {
    this._metalProduction = value;
  }

  private _mineralProduction: number = 0;

  get mineralProduction(): number {
    return this._mineralProduction;
  }

  set mineralProduction(value: number) {
    this._mineralProduction = value;
  }

  private _foodProduction: number = 0;

  get foodProduction(): number {
    return this._foodProduction;
  }

  set foodProduction(value: number) {
    this._foodProduction = value;
  }

  private _energyProduction: number = 0;

  get energyProduction(): number {
    return this._energyProduction;
  }

  set energyProduction(value: number) {
    this._energyProduction = value;
  }
}
