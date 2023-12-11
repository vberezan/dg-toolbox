import {AllianceStatsPlanetsBatch} from "./alliance-stats-planets-batch.model";

export class AllianceStats {
  private _score: number = 0;
  private _avgScore: number = 0;
  private _combatScore: number = 0;
  private _combinedScore: number = 0;
  private _planets: number = 1;
  private _g1Total: number = 0;
  private _g213Total: number = 0;
  private _g1449Total: number = 0;
  private _relation: string = 'neutral';
  private _tag: string;
  private _rank: number;
  private _name: string;
  private _membersCount: number = 0;
  private _avatar: string;


  get avatar(): string {
    return this._avatar;
  }

  set avatar(value: string) {
    this._avatar = value;
  }

  get membersCount(): number {
    return this._membersCount;
  }

  set membersCount(value: number) {
    this._membersCount = value;
  }

  get avgScore(): number {
    return this._avgScore;
  }

  set avgScore(value: number) {
    this._avgScore = value;
  }

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

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get planets(): number {
    return this._planets;
  }

  set planets(value: number) {
    this._planets = value;
  }

  get g1Total(): number {
    return this._g1Total;
  }

  set g1Total(value: number) {
    this._g1Total = value;
  }

  get g213Total(): number {
    return this._g213Total;
  }

  set g213Total(value: number) {
    this._g213Total = value;
  }

  get g1449Total(): number {
    return this._g1449Total;
  }

  set g1449Total(value: number) {
    this._g1449Total = value;
  }

  get relation(): string {
    return this._relation;
  }

  set relation(value: string) {
    this._relation = value;
  }

  toJSON(): any {
    return {
      score: this.score,
      combatScore: this.combatScore,
      combinedScore: this.combinedScore,
      tag: this.tag,
      rank: this.rank,
      name: this.name,
      avgScore: this.avgScore,
      planets: this.planets,
      g1Total: this.g1Total,
      g213Total: this.g213Total,
      g1449Total: this.g1449Total,
      relation: this.relation,
      membersCount: this.membersCount,
      avatar: this.avatar
    }
  }
}
