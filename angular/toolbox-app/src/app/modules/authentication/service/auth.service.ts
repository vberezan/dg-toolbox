import {EventEmitter, inject, Injectable, OnDestroy} from '@angular/core';
import {Auth, authState, signInWithEmailAndPassword, signInWithPopup, User} from "@angular/fire/auth";
import {Subscription} from "rxjs";
import {collection, collectionData, Firestore, limit, query, where} from "@angular/fire/firestore";
import {GoogleAuthProvider} from "firebase/auth";

@Injectable({
  providedIn: 'platform'
})
export class AuthService implements OnDestroy {
  private auth: Auth = inject(Auth);
  private firestore: Firestore = inject(Firestore);

  private readonly authStateSubscription: Subscription;
  private authState$ = authState(this.auth);


  private _loggedStatus: EventEmitter<boolean> = new EventEmitter();
  readonly id: number;

  constructor() {
    this.id = Math.random();

    this.authStateSubscription = this.authState$.subscribe((user: User) => {
      if (user != null) {
        const validUsers = collection(this.firestore, 'valid-users');

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
              this.signOut(false).catch((error) => {
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

  ngOnDestroy(): void {
    this.authStateSubscription.unsubscribe();
  }

  signIn(email: string, password: string) {
    signInWithEmailAndPassword(this.auth, email, password)
      .catch((error) => {
          window.alert(error.message);
        }
      );
  }

  signInWithGoogle() {
    signInWithPopup(this.auth, new GoogleAuthProvider())
      .catch((error) => {
          window.alert(error.message)
        }
      );
  }

  async signOut(refresh: boolean) {
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
