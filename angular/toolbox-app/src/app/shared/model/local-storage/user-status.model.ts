export class UserStatus {
  private _name: string;
  private _turn: number;
  private _version: string;

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get turn(): number {
    return this._turn;
  }

  set turn(value: number) {
    this._turn = value;
  }

  get version(): string {
    return this._version;
  }

  set version(value: string) {
    this._version = value;
  }

  toJSON(): any {
    return {
      name: this.name,
      turn: this.turn,
      version: this.version
    }
  }
}
