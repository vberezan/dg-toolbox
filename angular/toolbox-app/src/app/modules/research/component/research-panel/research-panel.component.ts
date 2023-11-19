import {AfterViewInit, Component, inject} from '@angular/core';
import {PreloadResearchTimesService} from "../../service/preload-research-times.service";

@Component({
  selector: 'dgt-research-panel',
  template: '',
  styles: ['']
})
export class ResearchPanelComponent implements AfterViewInit {
  private preloadResearchTimesService: PreloadResearchTimesService = inject(PreloadResearchTimesService);

  ngAfterViewInit(): void {
    this.preloadResearchTimesService.fixQueuedResearchTimes();
  }
}
