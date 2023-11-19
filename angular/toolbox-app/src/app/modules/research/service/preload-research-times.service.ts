import {inject, Injectable} from '@angular/core';
import {LocalStorageService} from "../../local-storage/local-storage-manager/service/local-storage.service";
import {ResearchTimesConstants} from "../../../shared/model/research/research-times.constants";

@Injectable({
  providedIn: 'root'
})
export class PreloadResearchTimesService {
  private localStorageManager: LocalStorageService = inject(LocalStorageService);

  preloadResearchTimes(): void {
    document.querySelectorAll('.researchButton.researchQueued').forEach((queued: Element): void => {
      const value: string = queued.attributes.getNamedItem('data-hasqtip').value !== 'available' ?
        queued.attributes.getNamedItem('data-hasqtip').value : '1';
      let q: number = parseInt(value);

      let infoText: Element = queued.querySelector('.infoText');
      let researchTime: Element = document.createElement('div');
      researchTime.classList.add('researchTime');

      infoText.parentNode.insertBefore(researchTime, infoText);
    });
  }
}
