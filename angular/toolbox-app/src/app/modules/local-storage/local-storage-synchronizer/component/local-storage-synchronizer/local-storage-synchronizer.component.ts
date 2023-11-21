import {AfterViewInit, Component, ElementRef, inject, ViewChild} from '@angular/core';
import {SynchronizerService} from "../../service/synchronizer.service";
import {DarkgalaxyApiService} from "../../../../darkgalaxy-ui-parser/service/darkgalaxy-api.service";
import {Observable, Subscriber, Subscription} from "rxjs";
import {LocalStorageService} from "../../../local-storage-manager/service/local-storage.service";
import {LocalStorageKeys} from "../../../../../shared/model/local-storage/local-storage-keys";
import {collection, collectionData, Firestore, query} from "@angular/fire/firestore";
import {DocumentData} from "@angular/fire/compat/firestore";
import {AlliancePlanets} from "../../../../../shared/model/stats/alliance-planets-stats.model";
import {PlanetsBatch} from "../../../../../shared/model/stats/planets-batch.model";

@Component({
  selector: 'dgt-local-storage-synchronizer',
  templateUrl: './local-storage-synchronizer.component.html',
  styleUrls: ['./local-storage-synchronizer.component.css']
})
export class LocalStorageSynchronizerComponent implements AfterViewInit {
  @ViewChild('dgtUpdatingModel') dgtUpdatingModel: ElementRef;

  private localStorageService: LocalStorageService = inject(LocalStorageService);
  private synchronizerService: SynchronizerService = inject(SynchronizerService);
  private dgAPI: DarkgalaxyApiService = inject(DarkgalaxyApiService);

  private firestore: Firestore = inject(Firestore);

  ngAfterViewInit(): void {

    const metadataPath: any = collection(this.firestore, 'alliances-planets');

    let subscription: Subscription = collectionData(
      query(metadataPath),
    ).subscribe((item: DocumentData[]): void => {
      let metadata: AlliancePlanets[] = Object.assign([], item);

      metadata.forEach((alliance: AlliancePlanets): void => {
        console.log(alliance.tag);
        alliance.planets.forEach((planets: PlanetsBatch): void => {
          console.log('Galaxy ' + planets.galaxy + 'planets: ' + planets.planets.join(','));
        });
      });

      subscription.unsubscribe();
    });


    this.delay(this.localStorageService.get(LocalStorageKeys.POST_INSTALL_FETCH_METADATA) ? 0 : 1000).then((): void => {
      let updates: number = 0;
      this.synchronizerService.updatesEmitter.subscribe((updateNumber: number): void => {
        updates += updateNumber;
        if (updates == 0) {
          this.delay(2500).then((): void => {
            this.dgtUpdatingModel.nativeElement.classList.add('hide');
            this.dgtUpdatingModel.nativeElement.classList.remove('show');
            document.body.classList.remove('dgt-overlay-open');
            window.location.reload();
          });
        } else {
          this.dgtUpdatingModel.nativeElement.classList.add('show');
          this.dgtUpdatingModel.nativeElement.classList.remove('hide');
          document.body.classList.add('dgt-overlay-open');
          this.delay(2500).then((): void => {
            return
          });
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
    });
  }

  private delay = async (ms: number): Promise<unknown> => new Promise(res => setTimeout(res, ms));
}
