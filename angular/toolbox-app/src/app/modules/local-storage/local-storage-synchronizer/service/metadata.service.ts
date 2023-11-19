import {inject, Injectable} from '@angular/core';
import {UpdateMetadata} from "../../../../shared/model/stats/update-metadata.model";
import {collection, doc, docData, Firestore, setDoc, updateDoc} from "@angular/fire/firestore";
import {Subscription} from "rxjs";
import {DocumentData} from "@angular/fire/compat/firestore";
import {DarkgalaxyApiService} from "../../../darkgalaxy-ui-parser/service/darkgalaxy-api.service";

@Injectable({
  providedIn: 'platform'
})
export class MetadataService {
  private firestore: Firestore = inject(Firestore);
  private dgAPI: DarkgalaxyApiService = inject(DarkgalaxyApiService);
  private metadataPath: any = collection(this.firestore, 'metadata');

  updateMetadata(document: string): void {

    let subscription: Subscription = docData(doc(this.metadataPath, document)).subscribe((item: DocumentData): void => {
      if (item) {
        let updateMetadata: UpdateMetadata = Object.assign(new UpdateMetadata(0, 0), item);

        if (updateMetadata.turn === this.dgAPI.gameTurn()) {
          updateMetadata.version++;
        } else {
          updateMetadata.turn = this.dgAPI.gameTurn();
          updateMetadata.version = 1;
        }

        updateDoc(doc(this.metadataPath, 'players-rankings-turn'), JSON.parse(JSON.stringify(updateMetadata)))
          .catch((e): void => console.log(e));
      } else {
        setDoc(doc(this.metadataPath, 'players-rankings-turn'), JSON.parse(JSON.stringify(new UpdateMetadata(this.dgAPI.gameTurn(), 1))))
          .catch((e): void => console.log(e));
      }

      subscription.unsubscribe();
    });
  }
}
