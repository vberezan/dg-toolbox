import {EventEmitter, Injectable, OnDestroy} from '@angular/core';
import {Auth, authState, signInWithEmailAndPassword, signInWithPopup, User} from "@angular/fire/auth";
import {collection, collectionData, Firestore, limit, query, where} from "@angular/fire/firestore";
import {GoogleAuthProvider} from "firebase/auth";
import {Subscription} from "rxjs";
import firebase from "firebase/compat";
import DocumentData = firebase.firestore.DocumentData;

@Injectable({
  providedIn: 'platform'
})
export class AuthService implements OnDestroy {
  private _loggedStatus: EventEmitter<boolean> = new EventEmitter();
  private authSubscription: Subscription;
  private _refreshInProgress: boolean = false;

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
        collectionData(
          query(collection(firestore, 'valid-users'),
            where('email', '==', user.email),
            limit(1)
          )
        ).subscribe((items: DocumentData[]): void => {
          if (items.length > 0) {
            let userCheck: { email: string, enabled: boolean } = Object.assign({email: '', enabled: false}, items[0]);

            if (userCheck.enabled) {
              localStorage.setItem('user', JSON.stringify(user));
              this._loggedStatus.emit(true);
            } else {
              this.signOut(auth, false);
            }
          } else {
            this.signOut(auth, false);
          }
        });
      } else {
        localStorage.removeItem('user');
        this._loggedStatus.emit(false);
      }
    });
  }

  signInWithEmailAndPassword(auth: Auth, email: string, password: string): void {
    signInWithEmailAndPassword(auth, email, password)
      .catch((error) => {
          window.alert(error.message);
        }
      );
  }

  signInWithGoogle(auth: Auth): void {
    signInWithPopup(auth, new GoogleAuthProvider())
      .catch((error) => {
          window.alert(error.message)
        }
      );
  }

  signOut(auth: Auth, refreshPage: boolean): void {
    this._loggedStatus.emit(false);
    localStorage.removeItem('user');
    this._refreshInProgress = refreshPage;

    auth.signOut()
      .catch((error) => {
          window.alert(error.message)
        }
      );

    if (refreshPage) {
      location.reload();
    }
  }

  get loggedStatus(): EventEmitter<boolean> {
    return this._loggedStatus;
  }

  get refreshInProgress(): boolean {
    return this._refreshInProgress;
  }
}
