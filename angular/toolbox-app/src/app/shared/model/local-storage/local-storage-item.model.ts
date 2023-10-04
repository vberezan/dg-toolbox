export class LocalStorageItem {
  private readonly _value: any;
  private readonly _expiry: number;
  private readonly _ttl: number;


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
