export class LocalStorageItem {
  private _user: number;
  private _value: string;
  private _expiry: number;
  private _ttl: number;

  constructor(id: number, item: any, ttl: number) {
    this._user = id;
    this._value = JSON.stringify(item);
    this._ttl = ttl;
    this._expiry = Date.now() + ttl;
  }

  get user(): number {
    return this._user;
  }

  set user(value: number) {
    this._user = value;
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
      id: this.user,
      ttl: this.ttl,
      expiry: this.expiry,
      value: this.value
    }
  }
}
