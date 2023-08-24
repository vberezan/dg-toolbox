export class ResourceStats {
  private _ground: number = 0;
  private _orbit: number = 0;
  private _metalStored: number = 0;
  private _mineralStored: number = 0;
  private _foodStored: number = 0;
  private _energyStored: number = 0;
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

  get metalStored(): number {
    return this._metalStored;
  }

  set metalStored(value: number) {
    this._metalStored = value;
  }

  get mineralStored(): number {
    return this._mineralStored;
  }

  set mineralStored(value: number) {
    this._mineralStored = value;
  }

  get foodStored(): number {
    return this._foodStored;
  }

  set foodStored(value: number) {
    this._foodStored = value;
  }

  get energyStored(): number {
    return this._energyStored;
  }

  set energyStored(value: number) {
    this._energyStored = value;
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
