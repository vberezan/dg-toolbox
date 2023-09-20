export class AllianceOrder {
  private _instructions: string;
  private _target: string;
  private _turn: number;
  private _executed: boolean;
  private _user: string;
  private _wait: number;

  get instructions(): string {
    return this._instructions;
  }

  set instructions(value: string) {
    this._instructions = value;
  }

  get target(): string {
    return this._target;
  }

  set target(value: string) {
    this._target = value;
  }

  get turn(): number {
    return this._turn;
  }

  set turn(value: number) {
    this._turn = value;
  }

  get executed(): boolean {
    return this._executed;
  }

  set executed(value: boolean) {
    this._executed = value;
  }

  get user(): string {
    return this._user;
  }

  set user(value: string) {
    this._user = value;
  }

  get wait(): number {
    return this._wait;
  }

  set wait(value: number) {
    this._wait = value;
  }

  toJSON() {
    return {
      instructions: this._instructions,
      wait: this.wait,
      user: this.user,
      executed: this.executed,
      turn: this.turn,
      target: this.target
    }
  }
}
