import {AllianceStatsPlanetsBatch} from "./alliance-stats-planets-batch.model";

export class AllianceStats {
  private _score: number;
  private _combatScore: number;
  private _combinedScore: number;
  private _planets: AllianceStatsPlanetsBatch[] = [];
  private _tag: string;
  private _rank: number;
  private _alliance: string;


  get tag(): string {
    return this._tag;
  }

  set tag(value: string) {
    this._tag = value;
  }

  get rank(): number {
    return this._rank;
  }

  set rank(value: number) {
    this._rank = value;
  }

  get score(): number {
    return this._score;
  }

  set score(value: number) {
    this._score = value;
  }

  get combatScore(): number {
    return this._combatScore;
  }

  set combatScore(value: number) {
    this._combatScore = value;
  }

  get combinedScore(): number {
    return this._combinedScore;
  }

  set combinedScore(value: number) {
    this._combinedScore = value;
  }

  get alliance(): string {
    return this._alliance;
  }

  set alliance(value: string) {
    this._alliance = value;
  }

  get planets(): AllianceStatsPlanetsBatch[] {
    return this._planets;
  }

  set planets(value: AllianceStatsPlanetsBatch[]) {
    this._planets = value;
  }

  toJSON(): any {
    return {
      score: this.score,
      combatScore: this.combatScore,
      combinedScore: this.combinedScore,
      planets: this.planets,
      tag: this.tag,
      rank: this.rank,
      alliance: this.alliance
    }
  }
}
