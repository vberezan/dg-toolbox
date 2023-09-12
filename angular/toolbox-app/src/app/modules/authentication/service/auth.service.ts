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

    constructor() {
        this.subscription = this.auth.authState.subscribe((user: User) => {
            if (user) {
                localStorage.setItem('user', JSON.stringify(user));
            } else {
                localStorage.setItem('user', null);
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
        });
    }

}
