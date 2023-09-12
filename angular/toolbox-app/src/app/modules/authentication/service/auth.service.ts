import {inject, Injectable, OnDestroy} from '@angular/core';
import {User} from "@angular/fire/auth";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {Subscription} from "rxjs";
import {GoogleAuthProvider} from 'firebase/auth';
import firebase from "firebase/compat";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {PlanetScan} from "../../../model/shared-scans/shared-scans-planet-scan.model";
import UserCredential = firebase.auth.UserCredential;

@Injectable({
    providedIn: 'platform'
})
export class AuthService implements OnDestroy {
    private auth: AngularFireAuth = inject(AngularFireAuth);
    private subscription: Subscription;
    private firestore: AngularFirestore = inject(AngularFirestore);
    private _isLoggedIn: boolean = false;

    constructor() {
        this.subscription = this.auth.authState.subscribe((user: User) => {
            if (user != null) {
                this.firestore.collection('users', ref => ref.where('email', '==', user.email).limit(1))
                    .get().subscribe((items) => {
                        let dbUser: { email: string, active: boolean } =
                            Object.assign({ email: '', active: false }, items.docChanges().map(entry => {
                                return entry.doc.data();
                            })[0]);

                        console.log(dbUser);
                    }
                );

                localStorage.setItem('user', JSON.stringify(user));
                this._isLoggedIn = true;
            } else {
                localStorage.removeItem('user');
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

    signInWithGoogle() {
        this.auth.signInWithPopup(new GoogleAuthProvider()).then((credentials: UserCredential) => {
            console.log(credentials.user.email);
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
