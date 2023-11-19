import {inject, Injectable} from '@angular/core';
import {LocalStorageService} from "../../local-storage/local-storage-manager/service/local-storage.service";

@Injectable({
  providedIn: 'root'
})
export class PreloadResearchTimesService {
  private localStorageManager: LocalStorageService = inject(LocalStorageService);

  constructor() {

  }
  preloadResearchTimes() {
  }
}
