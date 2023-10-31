import {Component, inject} from '@angular/core';
import {ChangelogService} from "../../service/changelog.service";

@Component({
  selector: 'dgt-changelog',
  templateUrl: './changelog.component.html',
  styleUrls: ['./changelog.component.css']
})
export class ChangelogComponent {
  public changed: boolean = true;
  private changeLogService: ChangelogService = inject(ChangelogService);

  constructor() {
    this.changeLogService.getVersion();
  }
}
