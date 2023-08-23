export class PopulationStats {
  private _total: number = 0;

  get total(): number {
    return this._total;
  }

  set total(value: number) {
    this._total = value;
  }

  private _available: number = 0;

  get available(): number {
    return this._available;
  }

  set available(value: number) {
    this._available = value;
  }

  private _maximum: number = 0;

  get maximum(): number {
    return this._maximum;
  }

  set maximum(value: number) {
    this._maximum = value;
  }
}
