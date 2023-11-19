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
      let q: number = parseInt(queued.attributes.getNamedItem('data-hasqtip').value);

      console.log(q)
    });
  }
}
