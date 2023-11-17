import {ChangeDetectorRef, inject, Injectable} from '@angular/core';
import {Subscriber} from "rxjs";
import {LocalStorageService} from "../../local-storage/local-storage-manager/service/local-storage.service";
import {LocalStorageKeys} from "../../../shared/model/local-storage/local-storage-keys";

@Injectable({
  providedIn: 'root'
})
export class ChangelogService {
  private localStorageService: LocalStorageService = inject(LocalStorageService);

  checkVersion(changeDetector: ChangeDetectorRef, changeObserver: Subscriber<boolean>): void {
    console.log(this.localStorageService.get(LocalStorageKeys.LOCAL_VERSION));
    console.log(this.localStorageService.get(LocalStorageKeys.REMOTE_VERSION));

    changeObserver.next(this.localStorageService.get(LocalStorageKeys.LOCAL_VERSION) !=
      this.localStorageService.get(LocalStorageKeys.REMOTE_VERSION));

    changeObserver.complete();
    changeDetector.detectChanges();
  }
}
