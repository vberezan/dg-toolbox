import {Component, inject} from '@angular/core';
import {PreloadResearchTimesService} from "../../service/preload-research-times.service";

@Component({
  selector: 'dgt-research-panel',
  template: '',
  styles: ['']
})
export class ResearchPanelComponent {
  private preloadResearchTimesService: PreloadResearchTimesService = inject(PreloadResearchTimesService);

  constructor() {
    this.preloadResearchTimesService.fixQueuedResearchTimes();
  }
}
