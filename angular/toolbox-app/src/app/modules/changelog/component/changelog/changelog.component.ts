import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, inject, ViewChild} from '@angular/core';
import {ChangelogService} from "../../service/changelog.service";
import {Observable, Subscriber} from "rxjs";
import {LocalStorageService} from "../../../local-storage/local-storage-manager/service/local-storage.service";

@Component({
  selector: 'dgt-changelog',
  templateUrl: './changelog.component.html',
  styleUrls: ['./changelog.component.css']
})
export class ChangelogComponent implements AfterViewInit {
  @ViewChild('dgtSpinner') loadSpinner: ElementRef;
  @ViewChild('dgtUpdatingModel') dgtUpdatingModel: ElementRef;
  private changeLogService: ChangelogService = inject(ChangelogService);
  private changeDetector: ChangeDetectorRef = inject(ChangeDetectorRef);
  private localStorageService: LocalStorageService = inject(LocalStorageService);

  public updateAvailable: Observable<boolean>;
  public version: string;
  public newVersion: string;

  constructor() {
    this.updateAvailable = new Observable<boolean>((changeObserver: Subscriber<boolean>): void => {
      this.changeLogService.checkForUpdate(this.changeDetector, changeObserver);
    });

    this.newVersion = this.localStorageService.remoteMetadata().dgtVersion;
    this.version = this.localStorageService.localMetadata().dgtVersion;
  }

  installUpdate(): void {
    this.changeLogService.installUpdate(this.dgtUpdatingModel);
  }

  ngAfterViewInit(): void {
    this.changeLogService.showComponent(this.loadSpinner);
  }
}
