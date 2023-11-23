import {inject, Injectable} from '@angular/core';
import {UpdateMetadata} from "../../../../shared/model/stats/update-metadata.model";
import {collection, doc, docData, Firestore, setDoc, updateDoc} from "@angular/fire/firestore";
import {Subscription} from "rxjs";
import {DocumentData} from "@angular/fire/compat/firestore";
import {DarkgalaxyApiService} from "../../../darkgalaxy-ui-parser/service/darkgalaxy-api.service";
import {LocalStorageService} from "../../local-storage-manager/service/local-storage.service";
import {LocalStorageKeys} from "../../../../shared/model/local-storage/local-storage-keys";

@Injectable({
  providedIn: 'platform'
})
export class MetadataService {
  private firestore: Firestore = inject(Firestore);
  private dgAPI: DarkgalaxyApiService = inject(DarkgalaxyApiService);
  private metadataPath: any = collection(this.firestore, 'metadata');
  private localStorageService: LocalStorageService = inject(LocalStorageService);

  updateMetadataTurns(document: string): void {
    let subscription: Subscription = docData(doc(this.metadataPath, document)).subscribe((item: DocumentData): void => {
      if (item) {
        let updateMetadata: UpdateMetadata = Object.assign(new UpdateMetadata(0, 0), item);

        if (updateMetadata.turn === this.dgAPI.gameTurn()) {
          updateMetadata.version++;
        } else {
          updateMetadata.turn = this.dgAPI.gameTurn();
          updateMetadata.version = 1;
        }

        updateMetadata.lock = false;
        updateDoc(doc(this.metadataPath, document), JSON.parse(JSON.stringify(updateMetadata)))
          .catch((e): void => console.log(e));
      } else {
        setDoc(doc(this.metadataPath, document), JSON.parse(JSON.stringify(new UpdateMetadata(this.dgAPI.gameTurn(), 1))))
          .catch((e): void => console.log(e));
      }

      subscription.unsubscribe();
    });
  }

  resetSortingMaps(): void {
    if (window.location.pathname.indexOf('/rankings/players') === -1) {
      this.localStorageService.remove(LocalStorageKeys.PLAYER_RANKINGS_SORT_MAP)
    }
  }
}
