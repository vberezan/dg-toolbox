import {ChangeDetectorRef, Component, inject} from '@angular/core';
import {ChangelogService} from "../../service/changelog.service";
import {Observable, Subscriber} from "rxjs";

@Component({
  selector: 'dgt-changelog',
  templateUrl: './changelog.component.html',
  styleUrls: ['./changelog.component.css']
})
export class ChangelogComponent {
  private changeLogService: ChangelogService = inject(ChangelogService);
  // private changeDetection: ChangeDetectorRef = inject(ChangeDetectorRef);

  // public changed: Observable<boolean>;

  constructor() {
    // this.changed = new Observable<boolean>((observer: Subscriber<boolean>): void => {
    //   this.changeLogService.checkVersion(this.changeDetection, observer);
    // });

    // this.changeDetection.detectChanges();
  }
}
