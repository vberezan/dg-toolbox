import {Injectable} from '@angular/core';
import {ResearchTimesConstants} from "../../../shared/model/research/research-times.constants";

@Injectable({
  providedIn: 'root'
})
export class PreloadResearchTimesService {
  fixQueuedResearchTimes(): void {
    document.querySelectorAll('.researchButton').forEach((queued: Element, index: number): void => {
      if (queued.classList.contains('researchQueued')) {
        let infoText: Element = queued.querySelector('.infoText');
        infoText.classList.add('queuePosition');
        let researchTime: Element = document.createElement('div');
        researchTime.classList.add('infoText', 'researchTime');
        researchTime.innerHTML = ResearchTimesConstants.times[index][1].toString();

        infoText.parentNode.insertBefore(researchTime, infoText);
      }
    });
  }
}
