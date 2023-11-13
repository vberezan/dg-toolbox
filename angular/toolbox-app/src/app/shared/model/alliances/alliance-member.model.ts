import {AllianceMemberStats} from "./alliance-member-stats.model";

export class AllianceMember {
  private _name: string;
  private _dgId: string;
  private _kickEta: string;
  private _stats: AllianceMemberStats = new AllianceMemberStats();


  get stats(): AllianceMemberStats {
    return this._stats;
  }

  set stats(value: AllianceMemberStats) {
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

  toJSON() {
    return {
      name: this.name,
      dgId: this.dgId,
      kickEta: this.kickEta,
      stats: this.stats
    }
  }
}
