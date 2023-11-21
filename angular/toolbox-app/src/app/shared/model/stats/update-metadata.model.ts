import {Optional} from "@angular/core";

export class UpdateMetadata {
  private _turn: number;
  private _version: number;
  private _lock: boolean = false;

  constructor(turn: number, version: number, @Optional() lock: boolean = false) {
    this._turn = turn;
    this._version = version;
    this._lock = lock;
  }

  get lock(): boolean {
    return this._lock;
  }

  set lock(value: boolean) {
    this._lock = value;
  }

  get turn(): number {
    return this._turn;
  }

  set turn(value: number) {
    this._turn = value;
  }

  get version(): number {
    return this._version;
  }

  set version(value: number) {
    this._version = value;
  }

  toJSON(): any {
    return {
      turn: this.turn,
      version: this.version,
      lock: this.lock
    }
  }
}
