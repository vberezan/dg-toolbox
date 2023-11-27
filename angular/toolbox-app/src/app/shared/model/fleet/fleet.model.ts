import {NameQuantity} from "../name-quantity.model";

export class Fleet {
  private _ships: NameQuantity[] = [];
  private _owner: string;
  private _alliance: string;
  private _eta: number;
  private _hostile: boolean = false;
  private _allied: boolean = false;
  private _friendly: boolean = false;
  private _score: number = 0;
  private _id: string;


  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get score(): number {
    return this._score;
  }

  set score(value: number) {
    this._score = value;
  }

  get hostile(): boolean {
    return this._hostile;
  }

  set hostile(value: boolean) {
    this._hostile = value;
  }

  get allied(): boolean {
    return this._allied;
  }

  set allied(value: boolean) {
    this._allied = value;
  }

  get friendly(): boolean {
    return this._friendly;
  }

  set friendly(value: boolean) {
    this._friendly = value;
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
      friendly: this.friendly,
      score: this.score,
      id: this.id
    }
  }
}
