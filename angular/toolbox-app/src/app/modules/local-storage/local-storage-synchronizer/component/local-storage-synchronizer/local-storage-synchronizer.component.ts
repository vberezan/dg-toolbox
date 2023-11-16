import {Component, inject} from '@angular/core';
import {SynchronizerService} from "../../service/synchronizer.service";
import {DarkgalaxyApiService} from "../../../../darkgalaxy-ui-parser/service/darkgalaxy-api.service";

@Component({
  selector: 'dgt-local-storage-synchronizer',
  templateUrl: './local-storage-synchronizer.component.html',
  styleUrls: ['./local-storage-synchronizer.component.css']
})
export class LocalStorageSynchronizerComponent {
  private synchronizerService: SynchronizerService = inject(SynchronizerService);
  private dgAPI: DarkgalaxyApiService = inject(DarkgalaxyApiService);

  constructor() {
    this.synchronizerService.loadLiveUpdates();
    this.synchronizerService.loadTurnBasedUpdates(this.dgAPI.gameTurn());
  }
}
