import {Component, inject} from '@angular/core';
import {AuthService} from "../../service/auth.service";
import {Auth} from "@angular/fire/auth";
import {Firestore} from "@angular/fire/firestore";

@Component({
  selector: 'dgt-authentication',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  private authService: AuthService = inject(AuthService);
  private auth: Auth = inject(Auth);
  private firestore: Firestore = inject(Firestore);


  constructor() {
    this.authService.setUpFirebaseAuthSubscription(this.auth, this.firestore);
  }

  signInWithEmailAndPassword(email: string, password: string) {
    this.authService.signInWithEmailAndPassword(this.auth, email, password);
  }

  signInWithGoogle() {
    this.authService.signInWithGoogle(this.auth);
  }

  signOut(refreshPage: boolean): void {
    this.authService.signOut(this.auth, refreshPage);
  }

  displayLogin(): boolean {
    return localStorage.getItem('user') == null &&
      !this.authService.refreshInProgress;
  }
}
