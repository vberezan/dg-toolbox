import {AfterViewInit, Component, ElementRef, inject, ViewChild} from '@angular/core';
import {SynchronizerService} from "../../service/synchronizer.service";
import {DarkgalaxyApiService} from "../../../../darkgalaxy-ui-parser/service/darkgalaxy-api.service";
import {Observable, Subscriber, Subscription} from "rxjs";

@Component({
  selector: 'dgt-local-storage-synchronizer',
  templateUrl: './local-storage-synchronizer.component.html',
  styleUrls: ['./local-storage-synchronizer.component.css']
})
export class LocalStorageSynchronizerComponent implements AfterViewInit {
  @ViewChild('updatingModal') updatingModal: ElementRef;

  private synchronizerService: SynchronizerService = inject(SynchronizerService);
  private dgAPI: DarkgalaxyApiService = inject(DarkgalaxyApiService);

  ngAfterViewInit(): void {
    let updates: number = 0;

    this.synchronizerService.updatesEmitter.subscribe((updateNumber: number): void => {
      updates += updateNumber;
      console.log('updates: ' + updates);

      if (updates == 0) {
        this.updatingModal.nativeElement.classList.add('hide');
        this.updatingModal.nativeElement.classList.remove('show');
        document.body.classList.remove('dgt-overlay-open');
      } else {
        this.updatingModal.nativeElement.classList.add('show');
        this.updatingModal.nativeElement.classList.remove('hide');
        document.body.classList.add('dgt-overlay-open');
      }
    });

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
