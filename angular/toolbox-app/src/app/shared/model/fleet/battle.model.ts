import {Fleet} from "./fleet.model";

export class Battle {
  private _Fleet1: Fleet;
  private _Fleet2: Fleet;

  constructor(Fleet1: Fleet, Fleet2: Fleet) {
    this._Fleet1 = Fleet1;
    this._Fleet2 = Fleet2;
  }

  get Fleet1(): Fleet {
    return this._Fleet1;
  }

  set Fleet1(value: Fleet) {
    this._Fleet1 = value;
  }

  get Fleet2(): Fleet {
    return this._Fleet2;
  }

  set Fleet2(value: Fleet) {
    this._Fleet2 = value;
  }

  toJSON(): any {
    return {
      Fleet1: this.Fleet1,
      Fleet2: this.Fleet2
    }
  }
}
