import {Injectable} from '@angular/core';
import {ResearchTimesConstants} from "../../../shared/model/research/research-times.constants";

@Injectable({
  providedIn: 'root'
})
export class PreloadResearchTimesService {
  fixQueuedResearchTimes(): void {
    document.querySelectorAll('.researchButton.researchQueued').forEach((queued: Element): void => {
      const value: string = queued.attributes.getNamedItem('data-hasqtip').value !== 'available' ?
        queued.attributes.getNamedItem('data-hasqtip').value : '1';
      let q: number = parseInt(value);

      let infoText: Element = queued.querySelector('.infoText');
      let researchTime: Element = document.createElement('div');
      researchTime.classList.add('infoText', 'researchTime');
      researchTime.innerHTML = ResearchTimesConstants.times[q - 1][1].toString();

      infoText.parentNode.insertBefore(researchTime, infoText);
    });
  }
}
