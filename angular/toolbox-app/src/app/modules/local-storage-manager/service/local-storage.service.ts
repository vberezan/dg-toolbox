import {inject, Injectable, Optional} from '@angular/core';
import {LocalStorageItem} from "../../../shared/model/local-storage/local-storage-item.model";
import {DarkgalaxyApiService} from "../../darkgalaxy-ui-parser/service/darkgalaxy-api.service";

@Injectable({
  providedIn: 'platform'
})
export class LocalStorageService {
  private dgApi: DarkgalaxyApiService = inject(DarkgalaxyApiService);

  cache(key: string, value: any, @Optional() ttl: number = 0): void {
    const item: LocalStorageItem = new LocalStorageItem(this.dgApi.username(), value, ttl);
    localStorage.setItem(key, JSON.stringify(item))
  }

  get(key: string): any {
    const itemStr: string = localStorage.getItem(key);

    if (!itemStr) {
      return null;
    }

    const item: LocalStorageItem = Object.assign(LocalStorageItem, JSON.parse(itemStr));

    if ((this.dgApi.username() === item.user) && (item.ttl > 0 && (Date.now() > item.expiry))) {
      localStorage.removeItem(key);
      return null;
    }

    return JSON.parse(item.value);
  }

  remove(key: string): void {
    localStorage.removeItem(key);
  }
}
