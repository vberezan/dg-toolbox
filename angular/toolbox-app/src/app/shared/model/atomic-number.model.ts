export class AtomicNumber {
  private _number: number;

  constructor(number: number) {
    this._number = number;
  }

  get number(): number {
    return this._number;
  }

  set number(value: number) {
    this._number = value;
  }
}
