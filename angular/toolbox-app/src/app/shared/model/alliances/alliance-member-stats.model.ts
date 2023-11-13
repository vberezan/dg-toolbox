export class AllianceMemberStats {
  private _score: number = 0;
  private _combatScore: number = 0;
  private _planets: number = 0;
  private _rank: number = 0;
  private _name: string;

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
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

  get planets(): number {
    return this._planets;
  }

  set planets(value: number) {
    this._planets = value;
  }

  toJSON() {
    return {
      name: this.name,
      planets: this.planets,
      score: this.score,
      combatScore: this.combatScore,
      rank: this.rank
    }
  }
}
