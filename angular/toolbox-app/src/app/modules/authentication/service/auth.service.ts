import {EventEmitter, inject, Injectable, OnDestroy} from '@angular/core';
import {Auth, authState, signInWithEmailAndPassword, signInWithPopup, User} from "@angular/fire/auth";
import {collection, collectionData, Firestore, limit, query, where} from "@angular/fire/firestore";
import {GoogleAuthProvider} from "firebase/auth";
import {Subscription} from "rxjs";
import firebase from "firebase/compat";
import {AuthState} from "../../../shared/model/authentication/auth-state.model";
import {UserRole} from "../../../shared/model/authentication/user-role";
import DocumentData = firebase.firestore.DocumentData;
import {LocalStorageKeys} from "../../../shared/model/local-storage/local-storage-keys";
import {LocalStorageService} from "../../local-storage-manager/service/local-storage.service";

@Injectable({
  providedIn: 'platform'
})
export class AuthService implements OnDestroy {
  private localStorageService: LocalStorageService = inject(LocalStorageService);

  private _authState: EventEmitter<AuthState> = new EventEmitter();
  private _refreshInProgress: boolean = false;
  private authSubscription: Subscription;

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
            let userCheck: { email: string, enabled: boolean, role: UserRole } = Object.assign({
              email: '',
              enabled: false,
              role: UserRole.USER
            }, items[0]);

            if (userCheck.enabled) {
              this.localStorageService.cache(LocalStorageKeys.USER, {user: user.email});
              this._authState.emit(new AuthState(true, userCheck.role));
            } else {
              this.signOut(auth, false);
            }
          } else {
            this.signOut(auth, false);
          }
        });
      } else {
        this.localStorageService.remove(LocalStorageKeys.USER);
        this._authState.emit(new AuthState(false, null));
      }
    });
  }

  signInWithEmailAndPassword(auth: Auth, email: string, password: string, refreshPage: boolean): void {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        if (refreshPage) {
          location.reload();
        }
      })
      .catch((error) => {
          window.alert(error.message);
        }
      );
  }

  signInWithGoogle(auth: Auth, refreshPage: boolean): void {
    signInWithPopup(auth, new GoogleAuthProvider())
      .then(() => {
        if (refreshPage) {
          location.reload();
        }
      })
      .catch((error) => {
          window.alert(error.message)
        }
      );
  }

  signOut(auth: Auth, refreshPage: boolean): void {
    this.localStorageService.remove(LocalStorageKeys.USER);
    this._refreshInProgress = refreshPage;
    this._authState.emit(new AuthState(true, null));

    auth.signOut()
      .then(() => {
        if (refreshPage) {
          location.reload();
        }
      })
      .catch((error) => {
          window.alert(error.message)
        }
      );
  }

  get authState(): EventEmitter<AuthState> {
    return this._authState;
  }

  get refreshInProgress(): boolean {
    return this._refreshInProgress;
  }
}
