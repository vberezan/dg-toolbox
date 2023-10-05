export class LocalStorageItem {
  private _id: number;
  private _value: string;
  private _expiry: number;
  private _ttl: number;

  constructor(id: number, item: any, ttl: number) {
    this._id = id;
    this._value = JSON.stringify(item);
    this._ttl = ttl;
    this._expiry = Date.now() + ttl;
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
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
      id: this.id,
      ttl: this.ttl,
      expiry: this.expiry,
      value: this.value
    }
  }
}
