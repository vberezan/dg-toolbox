import {Component, inject} from '@angular/core';
import {SynchronizerService} from "../../service/synchronizer.service";
import {DarkgalaxyApiService} from "../../../../darkgalaxy-ui-parser/service/darkgalaxy-api.service";
import {Observable, Subscriber, Subscription} from "rxjs";
import {MetadataService} from "../../service/metadata.service";

@Component({
  selector: 'dgt-local-storage-synchronizer',
  templateUrl: './local-storage-synchronizer.component.html',
  styleUrls: ['./local-storage-synchronizer.component.css']
})
export class LocalStorageSynchronizerComponent {
  private synchronizerService: SynchronizerService = inject(SynchronizerService);
  private dgAPI: DarkgalaxyApiService = inject(DarkgalaxyApiService);
  private metadataService: MetadataService = inject(MetadataService);

  constructor() {
    this.metadataService.test();

    let subscription: Subscription = new Observable((observer: Subscriber<boolean>): void => {
      this.synchronizerService.updateMetadata(observer);
    }).subscribe((loaded: boolean): void => {
      if (loaded) {
        this.synchronizerService.loadTurnBasedUpdates(this.dgAPI.gameTurn());

        subscription.unsubscribe();
      }
    });

    this.synchronizerService.loadLiveUpdates();
  }
}
