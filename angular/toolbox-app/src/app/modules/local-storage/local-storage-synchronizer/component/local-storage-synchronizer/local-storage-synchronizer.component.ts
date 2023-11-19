import {Component, ElementRef, inject, ViewChild} from '@angular/core';
import {SynchronizerService} from "../../service/synchronizer.service";
import {DarkgalaxyApiService} from "../../../../darkgalaxy-ui-parser/service/darkgalaxy-api.service";
import {Observable, Subscriber, Subscription} from "rxjs";

@Component({
  selector: 'dgt-local-storage-synchronizer',
  templateUrl: './local-storage-synchronizer.component.html',
  styleUrls: ['./local-storage-synchronizer.component.css']
})
export class LocalStorageSynchronizerComponent {
  @ViewChild('updatingModal') updatingModal: ElementRef;

  private synchronizerService: SynchronizerService = inject(SynchronizerService);
  private dgAPI: DarkgalaxyApiService = inject(DarkgalaxyApiService);
  private updates: boolean[] = [];

  constructor() {
    let subscription: Subscription = new Observable((observer: Subscriber<boolean>): void => {
      this.updatingModal.nativeElement.classList.add('show');
      this.updatingModal.nativeElement.classList.remove('hide');

      this.synchronizerService.updateMetadata(observer, this.updates);
    }).subscribe((loaded: boolean): void => {
      if (loaded) {
        this.synchronizerService.loadTurnBasedUpdates(this.dgAPI.gameTurn(), this.updates);

        subscription.unsubscribe();
      }
    });

    this.synchronizerService.updatesEmitter.subscribe((updates: number): void => {
      console.log('updates: ' + updates);
    });

    this.synchronizerService.loadLiveUpdates();
  }
}
