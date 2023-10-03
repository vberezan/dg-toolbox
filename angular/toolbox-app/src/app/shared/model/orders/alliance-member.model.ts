export class AllianceMember {
  private _name: string;
  private _note: string;
  private _dgId: string;

  constructor(name: string, note: string, dgId: string) {
    this._name = name;
    this._note = note;
    this._dgId = dgId;
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

  get dgId(): string {
    return this._dgId;
  }

  set dgId(value: string) {
    this._dgId = value;
  }
}
