import {ShipType} from "./ship-type";

export class KillRate {
  private _target: ShipType;
  private _rate: number;

  constructor(target: ShipType, rate: number) {
    this._target = target;
    this._rate = rate;
  }

  get target(): ShipType {
    return this._target;
  }

  set target(value: ShipType) {
    this._target = value;
  }

  get rate(): number {
    return this._rate;
  }

  set rate(value: number) {
    this._rate = value;
  }

  toJSON(): any {
    return {
      target: this.target,
      rate: this.rate
    }
  }
}
