import {NameQuantity} from "./name-quantity.model";

export class Fleet {
  private _ships: NameQuantity[] = [];
  private _owner: string;
  private _alliance: string;
  private _eta: number;

  get ships(): NameQuantity[] {
    return this._ships;
  }

  set ships(value: NameQuantity[]) {
    this._ships = value;
  }

  get owner(): string {
    return this._owner;
  }

  set owner(value: string) {
    this._owner = value;
  }

  get alliance(): string {
    return this._alliance;
  }

  set alliance(value: string) {
    this._alliance = value;
  }

  get eta(): number {
    return this._eta;
  }

  set eta(value: number) {
    this._eta = value;
  }

  toJSON() {
    return {
      eta: this.eta,
      alliance: this.alliance,
      owner: this.owner,
      ships: this.ships
    }
  }
}
