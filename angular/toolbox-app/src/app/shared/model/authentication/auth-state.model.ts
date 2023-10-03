import {UserRole} from "./user-role";

export class AuthState {
  private readonly _status: boolean;
  private readonly _role: UserRole;

  constructor(status: boolean, role: UserRole) {
    this._status = status;
    this._role = role;
  }


  get status(): boolean {
    return this._status;
  }

  get role(): UserRole {
    return this._role;
  }
}
