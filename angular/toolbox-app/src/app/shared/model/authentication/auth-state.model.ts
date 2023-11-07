import {UserRole} from "./user-role";

export class AuthState {
  private readonly _status: boolean;
  private readonly _role: UserRole;
  private readonly _token: string;

  constructor(status: boolean, role: UserRole) {
    this._status = status;
    this._role = role;
  }

  get token(): string {
    return this._token;
  }

  get status(): boolean {
    return this._status;
  }

  get role(): UserRole {
    return this._role;
  }
}
