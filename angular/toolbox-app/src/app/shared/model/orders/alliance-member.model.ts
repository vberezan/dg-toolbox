export class AllianceMember {
  private _name: string;
  private _note: string;
  private _dgId: string;
  private _kickEta: string;

  get kickEta(): string {
    return this._kickEta;
  }

  set kickEta(value: string) {
    this._kickEta = value;
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

  toJSON() {
    return {
      name: this.name,
      note: this.note,
      dgId: this.dgId,
      kickEta: this.kickEta
    }
  }
}
