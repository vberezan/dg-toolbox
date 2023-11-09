export class PlanetStats {

  private _location: string;
  private _galaxy: number;
  private _system: number;
  private _sector: number;
  private _planet: number;
  private _owner: string;
  private _alliance: string;
  private _turn: number;


  get location(): string {
    return this._location;
  }

  set location(value: string) {
    this._location = value;
  }

  get galaxy(): number {
    return this._galaxy;
  }

  set galaxy(value: number) {
    this._galaxy = value;
  }

  get system(): number {
    return this._system;
  }

  set system(value: number) {
    this._system = value;
  }

  get sector(): number {
    return this._sector;
  }

  set sector(value: number) {
    this._sector = value;
  }

  get planet(): number {
    return this._planet;
  }

  set planet(value: number) {
    this._planet = value;
  }

  get owner(): string {
    return this._owner;
  }

  set owner(value: string) {
    this._owner = value;
  }

  get alliance(): string {
    return this._alliance;
  }

  set alliance(value: string) {
    this._alliance = value;
  }

  get turn(): number {
    return this._turn;
  }

  set turn(value: number) {
    this._turn = value;
  }

  toJSON() {
    return {
      location: this.location,
      turn: this.turn,
      owner: this.owner,
      alliance: this.alliance,
      galaxy: this.galaxy,
      system: this.system,
      sector: this.sector,
      planet: this.planet
    }
  }
}
