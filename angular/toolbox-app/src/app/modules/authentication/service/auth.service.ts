import {inject, Injectable, OnDestroy} from '@angular/core';
import {User} from "@angular/fire/auth";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {Subscription} from "rxjs";

@Injectable({
    providedIn: 'platform'
})
export class AuthService implements OnDestroy {
    private auth: AngularFireAuth = inject(AngularFireAuth);
    private subscription: Subscription;
    private _isLoggedIn: boolean = false;

    constructor() {
        this.subscription = this.auth.authState.subscribe((user: User) => {
            if (user != null) {
                localStorage.setItem('user', JSON.stringify(user));
                this._isLoggedIn = true;
            } else {
                localStorage.setItem('user', null);
                this._isLoggedIn = false
            }
        });
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    signIn(email: string, password: string) {
        return this.auth
            .signInWithEmailAndPassword(email, password)
            .catch((error) => {
                window.alert(error.message);
            });
    }

    signOut() {
        return this.auth.signOut().then(() => {
            localStorage.removeItem('user');
            location.reload();
        });
    }

    get isLoggedIn(): boolean {
        return this._isLoggedIn;
    }
}
