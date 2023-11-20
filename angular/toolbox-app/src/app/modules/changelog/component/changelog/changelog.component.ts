import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, inject, ViewChild} from '@angular/core';
import {ChangelogService} from "../../service/changelog.service";
import {Observable, Subscriber} from "rxjs";
import {LocalStorageService} from "../../../local-storage/local-storage-manager/service/local-storage.service";
import {LocalStorageKeys} from "../../../../shared/model/local-storage/local-storage-keys";

@Component({
  selector: 'dgt-changelog',
  templateUrl: './changelog.component.html',
  styleUrls: ['./changelog.component.css']
})
export class ChangelogComponent implements AfterViewInit {
  @ViewChild('dgtSpinner') loadSpinner: ElementRef;
  private changeLogService: ChangelogService = inject(ChangelogService);
  private changeDetector: ChangeDetectorRef = inject(ChangeDetectorRef);
  private localStorageService: LocalStorageService = inject(LocalStorageService);

  public updateAvailable: Observable<boolean>;
  public version: string;
  public newVersion: string = this.localStorageService.remoteMetadata().dgtVersion;

  constructor() {
    this.updateAvailable = new Observable<boolean>((changeObserver: Subscriber<boolean>): void => {
      this.changeLogService.checkForUpdate(this.changeDetector, changeObserver);
    });

    this.version = this.localStorageService.localMetadata().dgtVersion
  }

  installUpdate(): void {
    this.changeLogService.installUpdateEmitter.emit(true);
  }

  ngAfterViewInit(): void {
    this.changeLogService.showComponent(this.loadSpinner);
  }
}
