import {NameQuantity} from "../name-quantity.model";

export class Fleet {
  private _ships: NameQuantity[] = [];
  private _owner: string;
  private _alliance: string;
  private _eta: number;
  private hostile: boolean = false;
  private allied: boolean = false;
  private _mine: boolean = false;

  get mine(): boolean {
    return this._mine;
  }

  set mine(value: boolean) {
    this._mine = value;
  }

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

  toJSON(): any {
    return {
      eta: this.eta,
      alliance: this.alliance,
      owner: this.owner,
      ships: this.ships,
      hostile: this.hostile,
      allied: this.allied,
      mine: this.mine
    }
  }
}
