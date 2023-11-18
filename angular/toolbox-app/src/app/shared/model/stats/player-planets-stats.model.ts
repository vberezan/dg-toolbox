export class PlayerPlanetsStats {
  private _playerId: number;
  private _planets: Map<number, string[]> = new Map<number, string[]>();
  private _name: string;

  get playerId(): number {
    return this._playerId;
  }

  set playerId(value: number) {
    this._playerId = value;
  }

  get planets(): Map<number, string[]> {
    return this._planets;
  }

  set planets(value: Map<number, string[]>) {
    this._planets = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  toJSON(): any {
    return {
      playerId: this.playerId,
      planets: Array.from(this.planets.entries()),
      name: this.name
    };
  }
}
