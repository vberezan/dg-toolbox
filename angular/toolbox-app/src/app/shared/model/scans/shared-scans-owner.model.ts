export class Owner {
  private _name: string;
  private _alliance: string;


  constructor(name: string, alliance: string) {
    this._name = name;
    this._alliance = alliance;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get alliance(): string {
    return this._alliance;
  }

  set alliance(value: string) {
    this._alliance = value;
  }

  toJSON(): any {
    return {
      name: this.name,
      alliance: this.alliance
    }
  }
}
