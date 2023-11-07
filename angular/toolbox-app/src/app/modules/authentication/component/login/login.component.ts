import {Component, inject} from '@angular/core';
import {AuthService} from "../../service/auth.service";
import {Auth} from "@angular/fire/auth";
import {Firestore} from "@angular/fire/firestore";
import {LocalStorageKeys} from "../../../../shared/model/local-storage/local-storage-keys";
import {LocalStorageService} from "../../../local-storage-manager/service/local-storage.service";
import {Observable, Subscriber} from "rxjs";

@Component({
  selector: 'dgt-authentication',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  private authService: AuthService = inject(AuthService);
  private auth: Auth = inject(Auth);
  private firestore: Firestore = inject(Firestore);
  private localStorageService: LocalStorageService = inject(LocalStorageService);

  protected displayLogin: Observable<boolean>;

  constructor() {
    this.authService.setUpFirebaseAuthSubscription(this.auth, this.firestore);

    this.displayLogin = new Observable((observer: Subscriber<boolean>): void => {
      observer.next(false);

      this.authService.authState.subscribe((): void => {
        console.log(this.localStorageService.get(LocalStorageKeys.USER));
        console.log(this.authService.refreshInProgress);

        observer.next(this.localStorageService.get(LocalStorageKeys.USER) == null &&
          !this.authService.refreshInProgress);
      });
    });
  }

  signInWithEmailAndPassword(email: string, password: string, refreshPage: boolean) {
    this.authService.signInWithEmailAndPassword(this.auth, email, password, refreshPage);
  }

  signInWithGoogle(refreshPage: boolean) {
    this.authService.signInWithGoogle(this.auth, refreshPage);
  }

  signOut(refreshPage: boolean): void {
    this.authService.signOut(this.auth, refreshPage);
  }
}
