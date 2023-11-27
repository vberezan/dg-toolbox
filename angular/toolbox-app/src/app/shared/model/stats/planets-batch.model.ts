export class PlanetsBatch {
  private _galaxy: number;
  private _total: number;
  private _planets: string[] = [];


  constructor(galaxy: number, planets: string[], total: number) {
    this._galaxy = galaxy;
    this._planets = planets;
    this._total = total;
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
      total: this.total
    };
  }
}
