export class Population {
  private _available: number = 0;
  private _currentNumber: number = 0;
  private _maximumNumber: number = 0;

  get available(): number {
    return this._available;
  }

  set available(value: number) {
    this._available = value;
  }

  get currentNumber(): number {
    return this._currentNumber;
  }

  set currentNumber(value: number) {
    this._currentNumber = value;
  }

  get maximumNumber(): number {
    return this._maximumNumber;
  }

  set maximumNumber(value: number) {
    this._maximumNumber = value;
  }
}
