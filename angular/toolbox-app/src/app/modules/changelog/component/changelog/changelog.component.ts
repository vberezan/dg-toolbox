import {ChangeDetectorRef, Component, inject} from '@angular/core';
import {ChangelogService} from "../../service/changelog.service";
import {Observable, Subscriber} from "rxjs";
import {LocalStorageService} from "../../../local-storage-manager/service/local-storage.service";

@Component({
  selector: 'dgt-changelog',
  templateUrl: './changelog.component.html',
  styleUrls: ['./changelog.component.css']
})
export class ChangelogComponent {
  private changeLogService: ChangelogService = inject(ChangelogService);
  private changeDetection: ChangeDetectorRef = inject(ChangeDetectorRef);
  private localStorageService: LocalStorageService = inject(LocalStorageService);

  public changed: Observable<boolean>;
  public version: string;

  constructor() {
    this.changed = new Observable<boolean>((observer: Subscriber<boolean>): void => {
      this.changeLogService.checkVersion(this.changeDetection, observer);
    });

    this.version = this.localStorageService.getVersion();
  }
}
