import {ChangeDetectorRef, inject, Injectable} from '@angular/core';
import {collection, collectionData, Firestore, query, where} from "@angular/fire/firestore";
import {Subscriber} from "rxjs";
import firebase from "firebase/compat";
import DocumentData = firebase.firestore.DocumentData;

@Injectable({
  providedIn: 'root'
})
export class BadgeService {
  private firestore: Firestore = inject(Firestore);

  subscribeToFleetOrders(user: string, observer: Subscriber<number>, changeDetection: ChangeDetectorRef) {
    let ordersRef = collection(this.firestore, 'orders');
    observer.next(10000);
    changeDetection.detectChanges();

    collectionData(
      query(ordersRef,
        where('user', '==', user),
        where('executed', '==', false)
      ), {idField: 'id'}
    ).forEach((items: DocumentData[]) => {
      observer.next(items.length);
      changeDetection.detectChanges();
    }).catch((error) => {
      console.log(error);
    });
  }
}
