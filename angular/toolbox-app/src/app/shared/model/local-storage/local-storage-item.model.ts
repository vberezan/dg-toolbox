export class LocalStorageItem {
  private _value: any;
  private _expiry: number;
  private _ttl: number;


  constructor(item: any, ttl: number) {
    this._value = item;
    this._ttl = ttl;
    this._expiry = Date.now() + ttl;
  }


  get value(): any {
    return this._value;
  }

  get expiry(): number {
    return this._expiry;
  }

  get ttl(): number {
    return this._ttl;
  }
}
