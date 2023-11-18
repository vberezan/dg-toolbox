export class PlayerPlanetsBatch {
  private _galaxy: number;
  private _planets: string[] = [];


  constructor(galaxy: number, planets: string[]) {
    this._galaxy = galaxy;
    this._planets = planets;
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

  toJSON(): any {
    return {
      galaxy: this.galaxy,
      planets: this.planets
    };
  }
}
