export class Resource {
  private _name: string;

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  private _quantity: number = 0;

  get quantity(): number {
    return this._quantity;
  }

  set quantity(value: number) {
    this._quantity = value;
  }

  private _abundance: number = 0;

  get abundance(): number {
    return this._abundance;
  }

  set abundance(value: number) {
    this._abundance = value;
  }

  private _production: number = 0;

  get production(): number {
    return this._production;
  }

  set production(value: number) {
    this._production = value;
  }
}
