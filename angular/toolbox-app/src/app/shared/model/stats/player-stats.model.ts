export class PlayerStats {
  private _playerId: number;
  private _score: number = 0;
  private _combatScore: number = 0;
  private _combinedScore: number = 0;
  private _planets: number = 1;
  private _g1Total: number = 0;
  private _g213Total: number = 0;
  private _g1449Total: number = 0;
  private _name: string;
  private _rank: number;
  private _alliance: string;
  private _relation: string = 'neutral';

  get relation(): string {
    return this._relation;
  }

  set relation(value: string) {
    this._relation = value;
  }

  get rank(): number {
    return this._rank;
  }

  set rank(value: number) {
    this._rank = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get playerId(): number {
    return this._playerId;
  }

  set playerId(value: number) {
    this._playerId = value;
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

  toJSON(): any {
    return {
      relation: this.relation,
      playerId: this.playerId,
      score: this.score,
      combatScore: this.combatScore,
      combinedScore: this.combinedScore,
      planets: this.planets,
      name: this.name,
      rank: this.rank,
      alliance: this.alliance,
      g1Total: this.g1Total,
      g213Total: this.g213Total,
      g1449Total: this.g1449Total
    }
  }
}
