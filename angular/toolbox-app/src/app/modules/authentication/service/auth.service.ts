import {EventEmitter, inject, Injectable, OnDestroy} from '@angular/core';
import {User} from "@angular/fire/auth";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {Subscription} from "rxjs";
import firebase from "firebase/compat/app";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import GoogleAuthProvider = firebase.auth.GoogleAuthProvider;

@Injectable({
    providedIn: 'platform'
})
export class AuthService implements OnDestroy {
    private auth: AngularFireAuth = inject(AngularFireAuth);
    private subscription: Subscription;
    private firestore: AngularFirestore = inject(AngularFirestore);
    private _loggedStatus: EventEmitter<boolean> = new EventEmitter();

    constructor() {
        if (this.subscription == null) {
            this.subscription = this.auth.authState.subscribe((user: User) => {
                console.log('inside authState subscribe');
                if (user != null) {
                    this.firestore.collection('valid-users', ref => ref.where('email', '==', user.email).limit(1))
                        .get().subscribe((items) => {
                            if (items.size == 1) {
                                let userCheck: { email: string, enabled: boolean } =
                                    Object.assign({email: '', enabled: false}, items.docChanges().map(entry => {
                                        return entry.doc.data();
                                    })[0]);

                                if (userCheck.enabled) {
                                    localStorage.setItem('user', JSON.stringify(user));
                                    this._loggedStatus.emit(true);
                                } else {
                                    this.signOut(false).catch((error) => {
                                        console.log(error.message);
                                    });
                                }
                            } else {
                                this.signOut(false).catch((error) => {
                                    console.log(error.message);
                                });
                            }
                        }
                    );
                } else {
                    localStorage.removeItem('user');
                    this._loggedStatus.emit(false);
                }
            });
        }
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    signIn(email: string, password: string) {
        console.log('email: ' + email + '; pass: ' + password);

        this.auth
            .signInWithEmailAndPassword(email, password)
            .catch((error) => {
                    window.alert(error.message);
                }
            );
    }

    signInWithGoogle() {
        this.auth
            .signInWithPopup(new GoogleAuthProvider())
            .catch((error) => {
                    window.alert(error.message)
                }
            );
    }

    async signOut(refresh: boolean) {
        console.log('inside logout');

        await this.auth.signOut();
        localStorage.removeItem('user');
        this._loggedStatus.emit(false);

        if (refresh) {
            location.reload();
        }
    }

    get loggedStatus(): EventEmitter<boolean> {
        return this._loggedStatus;
    }
}
