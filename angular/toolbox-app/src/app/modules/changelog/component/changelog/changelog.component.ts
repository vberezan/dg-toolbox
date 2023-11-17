import {ChangeDetectorRef, Component, inject} from '@angular/core';
import {ChangelogService} from "../../service/changelog.service";
import {Observable, Subscriber} from "rxjs";
import {LocalStorageService} from "../../../local-storage/local-storage-manager/service/local-storage.service";
import {LocalStorageKeys} from "../../../../shared/model/local-storage/local-storage-keys";

@Component({
  selector: 'dgt-changelog',
  templateUrl: './changelog.component.html',
  styleUrls: ['./changelog.component.css']
})
export class ChangelogComponent {
  private changeLogService: ChangelogService = inject(ChangelogService);
  private changeDetector: ChangeDetectorRef = inject(ChangeDetectorRef);
  private localStorageService: LocalStorageService = inject(LocalStorageService);

  public updateAvailable: Observable<boolean>;
  public version: string;

  constructor() {
    this.updateAvailable = new Observable<boolean>((changeObserver: Subscriber<boolean>): void => {
      this.changeLogService.checkVersion(this.changeDetector, changeObserver);
    });

    this.version = this.localStorageService.get(LocalStorageKeys.LOCAL_VERSION);
  }

  installUpdate() {
    this.localStorageService.cache(LocalStorageKeys.LOCAL_VERSION, this.localStorageService.get(LocalStorageKeys.REMOTE_VERSION));
    this.version = this.localStorageService.get(LocalStorageKeys.LOCAL_VERSION);
  }
}
