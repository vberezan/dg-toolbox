import {inject, Injectable} from '@angular/core';
import {collection, doc, docData, Firestore} from "@angular/fire/firestore";
import {DocumentData} from "@angular/fire/compat/firestore";
import {AllianceOrder} from "../../../shared/model/orders/alliance-order.model";

@Injectable({
  providedIn: 'root'
})
export class ChangelogService {
  private firestore: Firestore = inject(Firestore);

  getVersion() {
    let configRef = collection(this.firestore, 'config');

    docData(doc(configRef, 'version')
    ).forEach((item: DocumentData): void => {
      let version: string = Object.assign({value:''}, item).value;

      console.log(version);
    }).catch((error) => {
      console.log(error);
    });

  }
}
