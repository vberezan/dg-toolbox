export class PlayerStats {
  private _playerId: number;
  private _score: number;
  private _combatScore: number;
  private _combinedScore: number;
  private _planets: string[] = [];
  private _name: string;
  private _rank: number;
  private _alliance: string;

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

  get planets(): string[] {
    return this._planets;
  }

  set planets(value: string[]) {
    this._planets = value;
  }

  get alliance(): string {
    return this._alliance;
  }

  set alliance(value: string) {
    this._alliance = value;
  }

  toJSON(): any {
    return {
      playerId: this.playerId,
      score: this.score,
      combatScore: this.combatScore,
      combinedScore: this.combinedScore,
      planets: this.planets,
      name: this.name,
      rank: this.rank,
      alliance: this.alliance
    }
  }
}
