import {ChangeDetectorRef, ElementRef, EventEmitter, inject, Injectable} from '@angular/core';
import {Subscriber} from "rxjs";
import {LocalStorageService} from "../../local-storage/local-storage-manager/service/local-storage.service";
import {LocalStorageKeys} from "../../../shared/model/local-storage/local-storage-keys";

@Injectable({
  providedIn: 'platform'
})
export class ChangelogService {
  private localStorageService: LocalStorageService = inject(LocalStorageService);
  private _installUpdateEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();

  checkForUpdate(changeDetector: ChangeDetectorRef, changeObserver: Subscriber<boolean>): void {
    let remoteVersion = this.localStorageService.remoteMetadata().dgtVersion
    let localVersion = this.localStorageService.get(LocalStorageKeys.LOCAL_VERSION)
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

  get installUpdateEmitter(): EventEmitter<boolean> {
    return this._installUpdateEmitter;
  }
}
