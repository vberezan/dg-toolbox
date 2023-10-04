export class LocalStorageItem {
  private _value: string;
  private _expiry: number;
  private _ttl: number;


  constructor(item: any, ttl: number) {
    console.log(JSON.stringify(item));

    this._value = JSON.stringify(item);
    this._ttl = ttl;
    this._expiry = Date.now() + ttl;
  }


  get value(): string {
    return this._value;
  }

  get expiry(): number {
    return this._expiry;
  }

  get ttl(): number {
    return this._ttl;
  }
  set value(value: string) {
    this._value = value;
  }

  set expiry(value: number) {
    this._expiry = value;
  }

  set ttl(value: number) {
    this._ttl = value;
  }

  toJSON() {
    return {
      ttl: this.ttl,
      expiry: this.expiry,
      value: this.value
    }
  }
}
