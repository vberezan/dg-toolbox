import {PlayerStats} from "../stats/player-stats.model";

export class AllianceMember {
  private _name: string;
  private _dgId: string;
  private _kickEta: string;
  private _stats: PlayerStats = new PlayerStats();
  private _dgtVersion: string;


  get dgtVersion(): string {
    return this._dgtVersion;
  }

  set dgtVersion(value: string) {
    this._dgtVersion = value;
  }

  get stats(): PlayerStats {
    return this._stats;
  }

  set stats(value: PlayerStats) {
    this._stats = value;
  }

  get kickEta(): string {
    return this._kickEta;
  }

  set kickEta(value: string) {
    this._kickEta = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get dgId(): string {
    return this._dgId;
  }

  set dgId(value: string) {
    this._dgId = value;
  }

  toJSON(): any {
    return {
      name: this.name,
      dgId: this.dgId,
      kickEta: this.kickEta,
      stats: this.stats,
      dgtVersion: this.dgtVersion
    }
  }
}
