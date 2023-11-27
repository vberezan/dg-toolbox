import {ChangeDetectorRef, ElementRef, inject, Injectable} from '@angular/core';
import {Subscriber} from "rxjs";
import {LocalStorageService} from "../../local-storage/local-storage-manager/service/local-storage.service";
import {LocalStorageKeys} from "../../../shared/model/local-storage/local-storage-keys";
import {Metadata} from "../../../shared/model/local-storage/metadata.model";

@Injectable({
  providedIn: 'platform'
})
export class ChangelogService {
  private localStorageService: LocalStorageService = inject(LocalStorageService);

  checkForUpdate(changeDetector: ChangeDetectorRef, changeObserver: Subscriber<boolean>): void {
    if (this.localStorageService.remoteMetadata() === null || this.localStorageService.localMetadata() === null) {
      return;
    }

    let remoteVersion: string = this.localStorageService.remoteMetadata().dgtVersion;
    let localVersion: string = this.localStorageService.localMetadata().dgtVersion;
    changeObserver.next((remoteVersion !== null && remoteVersion !== localVersion && remoteVersion.trim().length > 0));

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

    this.delay(2000).finally((): void => {
      let localMetadata: Metadata = this.localStorageService.localMetadata();
      localMetadata.dgtVersion = this.localStorageService.remoteMetadata().dgtVersion;
      const user = this.localStorageService.get(LocalStorageKeys.USER);

      this.localStorageService.clearAll();
      this.localStorageService.cache(LocalStorageKeys.USER, user);
      this.localStorageService.cache(LocalStorageKeys.JS_VERSION, localMetadata.dgtVersion);
      this.localStorageService.cache(LocalStorageKeys.LOCAL_METADATA, localMetadata);

      dgtUpdatingModel.nativeElement.classList.add('hide');
      dgtUpdatingModel.nativeElement.classList.remove('show');
      document.body.classList.remove('dgt-overlay-open');

      window.location.reload();
    });

  }

  private delay = async (ms: number): Promise<unknown> => new Promise(res => setTimeout(res, ms));
}
