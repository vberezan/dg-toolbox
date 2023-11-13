export class AllianceMember {
  private _name: string;
  private _note: string;
  private _dgId: string;
  private _kickEta: string;
  private _score: number = 0;
  private _combatScore: number;
  private _planets: number;
  private _rank: number;

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

  get note(): string {
    return this._note;
  }

  set note(value: string) {
    this._note = value;
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
      note: this.note,
      dgId: this.dgId,
      kickEta: this.kickEta,
      planets: this.planets,
      score: this.score,
      combatScore: this.combatScore
    }
  }
}
