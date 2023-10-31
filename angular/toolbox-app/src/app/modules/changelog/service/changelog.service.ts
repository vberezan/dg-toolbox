import {inject, Injectable} from '@angular/core';
import {collection, doc, Firestore} from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root'
})
export class ChangelogService {
  private firestore: Firestore = inject(Firestore);

  getVersion() {
    let configRef = collection(this.firestore, 'config');

    console.log(doc(configRef, 'version'));
  }
}
