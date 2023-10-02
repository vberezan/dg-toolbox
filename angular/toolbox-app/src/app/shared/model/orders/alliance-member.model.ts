export class AllianceMember {
  private _name: string;
  private _note: string;

  constructor(name: string, note: string) {
    this._name = name;
    this._note = note;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get note(): string {
    return this._note;
  }

  set note(value: string) {
    this._note = value;
  }
}
