export class ResourceStats {
  private _ground: number = 0;
  private _orbit: number = 0;
  private _metalQuantity: number = 0;
  private _mineralQuantity: number = 0;
  private _foodQuantity: number = 0;
  private _energyQuantity: number = 0;
  private _metalProduction: number = 0;
  private _mineralProduction: number = 0;
  private _foodProduction: number = 0;
  private _energyProduction: number = 0;

  get ground(): number {
    return this._ground;
  }

  set ground(value: number) {
    this._ground = value;
  }

  get orbit(): number {
    return this._orbit;
  }

  set orbit(value: number) {
    this._orbit = value;
  }

  get metalQuantity(): number {
    return this._metalQuantity;
  }

  set metalQuantity(value: number) {
    this._metalQuantity = value;
  }

  get mineralQuantity(): number {
    return this._mineralQuantity;
  }

  set mineralQuantity(value: number) {
    this._mineralQuantity = value;
  }

  get foodQuantity(): number {
    return this._foodQuantity;
  }

  set foodQuantity(value: number) {
    this._foodQuantity = value;
  }

  get energyQuantity(): number {
    return this._energyQuantity;
  }

  set energyQuantity(value: number) {
    this._energyQuantity = value;
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

  get energyProduction(): number {
    return this._energyProduction;
  }

  set energyProduction(value: number) {
    this._energyProduction = value;
  }
}
