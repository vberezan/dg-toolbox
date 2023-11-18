export class UpdateMetadata {
  private _turn: number;
  private _version: number;


  constructor(turn: number, version: number) {
    this._turn = turn;
    this._version = version;
  }

  get turn(): number {
    return this._turn;
  }

  set turn(value: number) {
    this._turn = value;
  }

  get version(): number {
    return this._version;
  }

  set version(value: number) {
    this._version = value;
  }

  toJSON(): any {
    return {
      turn: this.turn,
      version: this.version
    }
  }
}
