import {ResourceQuantity} from "./resource-quantity.model";

export class Fleet {
  private _ships: ResourceQuantity[] = [];
  private _owner: string;
  private _alliance: string;
  private _eta: number;

  get ships(): ResourceQuantity[] {
    return this._ships;
  }

  set ships(value: ResourceQuantity[]) {
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

  toJSON(): any {
    return {
      eta: this.eta,
      alliance: this.alliance,
      owner: this.owner,
      ships: this.ships
    }
  }
}
