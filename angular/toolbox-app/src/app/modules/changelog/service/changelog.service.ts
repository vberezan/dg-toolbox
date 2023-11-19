import {ChangeDetectorRef, ElementRef, EventEmitter, inject, Injectable} from '@angular/core';
import {Subscriber} from "rxjs";
import {LocalStorageService} from "../../local-storage/local-storage-manager/service/local-storage.service";

@Injectable({
  providedIn: 'platform'
})
export class ChangelogService {
  private localStorageService: LocalStorageService = inject(LocalStorageService);
  private _installUpdateEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();

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

  get installUpdateEmitter(): EventEmitter<boolean> {
    return this._installUpdateEmitter;
  }
}
