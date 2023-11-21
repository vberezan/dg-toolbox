export class AllianceStatsPlanetsBatch {
  private _galaxy: number;
  private _planets: number;


  constructor(galaxy: number, planets: number) {
    this._galaxy = galaxy;
    this._planets = planets;
  }

  get galaxy(): number {
    return this._galaxy;
  }

  set galaxy(value: number) {
    this._galaxy = value;
  }


  get planets(): number {
    return this._planets;
  }

  set planets(value: number) {
    this._planets = value;
  }

  toJSON(): any {
    return {
      galaxy: this.galaxy,
      planets: this.planets
    };
  }
}
