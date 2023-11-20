import {ChangeDetectorRef, ElementRef, inject, Injectable} from '@angular/core';
import {Observable, Subscriber, Subscription} from "rxjs";
import {LocalStorageService} from "../../local-storage/local-storage-manager/service/local-storage.service";
import {collection, collectionData, Firestore, query} from "@angular/fire/firestore";
import {DocumentData} from "@angular/fire/compat/firestore";
import {LocalStorageKeys} from "../../../shared/model/local-storage/local-storage-keys";
import {JavascriptRepository} from "../../../shared/model/platform/javascript-repository.model";
import {Metadata} from "../../../shared/model/local-storage/metadata.model";
import {SynchronizerService} from "../../local-storage/local-storage-synchronizer/service/synchronizer.service";
import {DarkgalaxyApiService} from "../../darkgalaxy-ui-parser/service/darkgalaxy-api.service";

@Injectable({
  providedIn: 'platform'
})
export class ChangelogService {
  private localStorageService: LocalStorageService = inject(LocalStorageService);
  private firestore: Firestore = inject(Firestore);
  private synchronizerService: SynchronizerService = inject(SynchronizerService);
  private dgAPI: DarkgalaxyApiService = inject(DarkgalaxyApiService);

  checkForUpdate(changeDetector: ChangeDetectorRef, changeObserver: Subscriber<boolean>): void {
    if (this.localStorageService.remoteMetadata() === null || this.localStorageService.localMetadata() === null) {
      return;
    }

    let remoteVersion: string = this.localStorageService.remoteMetadata().dgtVersion;
    let localVersion: string = this.localStorageService.localMetadata().dgtVersion;
    changeObserver.next((remoteVersion !== null && remoteVersion !== localVersion && remoteVersion !== ''));

    changeObserver.complete();
    changeDetector.detectChanges();
  }

  showComponent(loadSpinner: ElementRef): void {
    if (loadSpinner.nativeElement && loadSpinner.nativeElement.classList.contains('show')) {
      loadSpinner.nativeElement.classList.add('hide');
      loadSpinner.nativeElement.classList.remove('show');
    }
  }

  installUpdate(dgtUpdatingModel: ElementRef): void {
    dgtUpdatingModel.nativeElement.classList.add('show');
    dgtUpdatingModel.nativeElement.classList.remove('hide');
    document.body.classList.add('dgt-overlay-open');

    this.delay(5000).then((): void => {
      const metadataPath: any = collection(this.firestore, 'metadata');

      let subscription: Subscription = collectionData(
        query(metadataPath),
      ).subscribe((item: DocumentData[]): void => {
        const metadata: any = Object.assign([], item);

        let javascriptRepository: JavascriptRepository = new JavascriptRepository();

        javascriptRepository.angularMain = metadata[1].angularMain;
        javascriptRepository.angularPolyfills = metadata[1].angularPolyfills;
        javascriptRepository.angularRuntime = metadata[1].angularRuntime;
        javascriptRepository.angularStyles = metadata[1].angularStyles;

        javascriptRepository.dgtUtils = metadata[1].dgtUtils;
        javascriptRepository.dgtSetupDgtPlaceholders = metadata[1].dgtSetupDgtPlaceholders;
        javascriptRepository.dgtReplaceShipsImages = metadata[1].dgtReplaceShipsImages;
        javascriptRepository.dgtReplacePlanetsImages = metadata[1].dgtReplacePlanetsImages;
        javascriptRepository.dgtReplaceIconsWithFaIcons = metadata[1].dgtReplaceIconsWithFaIcons;
        javascriptRepository.dgtReplaceIconsWithImages = metadata[1].dgtReplaceIconsWithImages;
        javascriptRepository.dgtReplaceStructuresImages = metadata[1].dgtReplaceStructuresImages;
        javascriptRepository.dgtCustomStyling = metadata[1].dgtCustomStyling;



        this.localStorageService.clearAll();
        this.localStorageService.cache(LocalStorageKeys.JAVASCRIPT_REPOSITORY, javascriptRepository);

        let subscription: Subscription = new Observable((observer: Subscriber<boolean>): void => {
          this.synchronizerService.updateMetadata(observer);
        }).subscribe((loaded: boolean): void => {
          if (loaded) {
            this.synchronizerService.loadTurnBasedUpdates(this.dgAPI.gameTurn());

            subscription.unsubscribe();
          }
        });

        let updates: number = 0;
        this.synchronizerService.updatesEmitter.subscribe((updateNumber: number): void => {
          updates += updateNumber;
          if (updates == 0) {
            this.delay(2500).then((): void => {
              dgtUpdatingModel.nativeElement.classList.add('hide');
              dgtUpdatingModel.nativeElement.classList.remove('show');
              document.body.classList.remove('dgt-overlay-open');
              window.location.reload();
            });
          } else {
            dgtUpdatingModel.nativeElement.classList.add('show');
            dgtUpdatingModel.nativeElement.classList.remove('hide');
            document.body.classList.add('dgt-overlay-open');
            this.delay(2500).then((): void => {return});
          }
        });

        subscription.unsubscribe();
      });
    });

  }

  private delay = async (ms: number): Promise<unknown> => new Promise(res => setTimeout(res, ms));
}
