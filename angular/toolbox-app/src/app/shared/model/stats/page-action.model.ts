export class PageAction {
  private _page: number;
  private _total: number;
  private _action: string;


  constructor(page: number, total: number, action: string) {
    this._page = page;
    this._total = total;
    this._action = action;
  }

  get page(): number {
    return this._page;
  }

  set page(value: number) {
    this._page = value;
  }

  get total(): number {
    return this._total;
  }

  set total(value: number) {
    this._total = value;
  }

  get action(): string {
    return this._action;
  }

  set action(value: string) {
    this._action = value;
  }
}
