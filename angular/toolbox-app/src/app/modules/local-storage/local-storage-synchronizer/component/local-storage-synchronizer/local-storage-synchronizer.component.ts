import {Component, inject} from '@angular/core';
import {SynchronizerService} from "../../service/synchronizer.service";

@Component({
  selector: 'dgt-local-storage-synchronizer',
  templateUrl: './local-storage-synchronizer.component.html',
  styleUrls: ['./local-storage-synchronizer.component.css']
})
export class LocalStorageSynchronizerComponent {
  private synchronizerService: SynchronizerService = inject(SynchronizerService);
}
