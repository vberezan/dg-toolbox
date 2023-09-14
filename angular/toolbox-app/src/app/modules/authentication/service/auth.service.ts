import {EventEmitter, Injectable, OnDestroy} from '@angular/core';
import {Auth, authState, signInWithEmailAndPassword, signInWithPopup, User} from "@angular/fire/auth";
import {collection, collectionData, Firestore, limit, query, where} from "@angular/fire/firestore";
import {GoogleAuthProvider} from "firebase/auth";
import {Subscription} from "rxjs";

@Injectable({
  providedIn: 'platform'
})
export class AuthService implements OnDestroy {
  private _loggedStatus: EventEmitter<boolean> = new EventEmitter();
  private authSubscription: Subscription;
  readonly id: number;

  constructor() {
    this.id = Math.random();
  }

  ngOnDestroy(): void {
    if (this.authSubscription != null) {
      this.authSubscription.unsubscribe();
    }
  }

  setUpFirebaseAuthSubscription(auth: Auth, firestore: Firestore): void {
    // -- current implementation will not allow multiple subscriptions for authState
    if (this.authSubscription != null) {
      this.authSubscription.unsubscribe();
    }

    this.authSubscription = authState(auth).subscribe((user: User) => {
      if (user != null) {
        const validUsers = collection(firestore, 'valid-users');

        collectionData(
          query(validUsers,
            where('email', '==', user.email),
            limit(1)
          )
        ).subscribe((items) => {
          if (items.length == 1) {
            let userCheck: { email: string, enabled: boolean } =
              Object.assign({email: '', enabled: false}, items.map(entry => {
                return entry;
              })[0]);

            if (userCheck.enabled) {
              localStorage.setItem('user', JSON.stringify(user));
              this._loggedStatus.emit(true);
            } else {
              this.signOut(auth, false).catch((error) => {
                console.log(error.message);
              });
            }
          }
        });
      } else {
        localStorage.removeItem('user');
        this._loggedStatus.emit(false);
      }
    });
  }

  signInWithEmailAndPassword(auth: Auth, email: string, password: string) {
    signInWithEmailAndPassword(auth, email, password)
      .catch((error) => {
          window.alert(error.message);
        }
      );
  }

  signInWithGoogle(auth: Auth) {
    signInWithPopup(auth, new GoogleAuthProvider())
      .catch((error) => {
          window.alert(error.message)
        }
      );
  }

  async signOut(auth: Auth, refreshPage: boolean) {
    await auth.signOut();
    localStorage.removeItem('user');
    this._loggedStatus.emit(false);

    if (refreshPage) {
      location.reload();
    }
  }

  get loggedStatus(): EventEmitter<boolean> {
    return this._loggedStatus;
  }
}
