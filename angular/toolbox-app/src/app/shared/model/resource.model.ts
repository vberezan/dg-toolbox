export class Resource {
  private _name: string;
  private _abundance: number = 0;
  private _production: number = 0;
  private _stored: number = 0;

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get stored(): number {
    return this._stored;
  }

  set stored(value: number) {
    this._stored = value;
  }

  get abundance(): number {
    return this._abundance;
  }

  set abundance(value: number) {
    this._abundance = value;
  }

  get production(): number {
    return this._production;
  }

  set production(value: number) {
    this._production = value;
  }

  toJSON() {
    return {
      name: this.name,
      abundance: this.abundance,
      production: this.production,
      stored: this.stored
    }
  }
}
