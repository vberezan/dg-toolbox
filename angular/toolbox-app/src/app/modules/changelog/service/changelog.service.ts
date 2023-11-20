import {ChangeDetectorRef, ElementRef, inject, Injectable} from '@angular/core';
import {Subscriber, Subscription} from "rxjs";
import {LocalStorageService} from "../../local-storage/local-storage-manager/service/local-storage.service";
import {collection, collectionData, Firestore, query} from "@angular/fire/firestore";
import {DocumentData} from "@angular/fire/compat/firestore";
import {LocalStorageKeys} from "../../../shared/model/local-storage/local-storage-keys";
import {JavascriptRepository} from "../../../shared/model/platform/javascript-repository.model";

@Injectable({
  providedIn: 'platform'
})
export class ChangelogService {
  private localStorageService: LocalStorageService = inject(LocalStorageService);
  private firestore: Firestore = inject(Firestore);

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

    // localStorage.clear();

    this.delay(2500).then((): void => {
      const metadataPath: any = collection(this.firestore, 'metadata');

      let subscription: Subscription = collectionData(
        query(metadataPath),
      ).subscribe((item: DocumentData[]): void => {
        const metadata: any = Object.assign([], item);

        let cache: JavascriptRepository = new JavascriptRepository();

        cache.angularMain = metadata[1].angularMain;
        cache.angularPolyfills = metadata[1].angularPolyfills;
        cache.angularRuntime = metadata[1].angularRuntime;
        cache.angularStyles = metadata[1].angularStyles;

        cache.dgtUtils = metadata[1].dgtUtils;
        cache.dgtSetupDgtPlaceholders = metadata[1].dgtSetupDgtPlaceholders;
        cache.dgtReplaceShipsImages = metadata[1].dgtReplaceShipsImages;
        cache.dgtReplacePlanetsImages = metadata[1].dgtReplacePlanetsImages;
        cache.dgtReplaceIconsWithFaIcons = metadata[1].dgtReplaceIconsWithFaIcons;
        cache.dgtReplaceIconsWithImages = metadata[1].dgtReplaceIconsWithImages;
        cache.dgtReplaceStructuresImages = metadata[1].dgtReplaceStructuresImages;
        cache.dgtCustomStyling = metadata[1].dgtCustomStyling;


        this.localStorageService.cache(LocalStorageKeys.JAVASCRIPT_REPOSITORY, cache);

        this.localStorageService.localMetadata().dgtVersion = this.localStorageService.remoteMetadata().dgtVersion;

        dgtUpdatingModel.nativeElement.classList.add('hide');
        dgtUpdatingModel.nativeElement.classList.remove('show');
        document.body.classList.remove('dgt-overlay-open');
        window.location.reload();

        subscription.unsubscribe();
      });
    });

  }

  private delay = async (ms: number): Promise<unknown> => new Promise(res => setTimeout(res, ms));
}
