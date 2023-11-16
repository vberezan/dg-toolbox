import {Injectable, Optional} from '@angular/core';
import {LocalStorageItem} from "../../../../shared/model/local-storage/local-storage-item.model";
import {LocalStorageKeys} from "../../../../shared/model/local-storage/local-storage-keys";

@Injectable({
  providedIn: 'platform'
})
export class LocalStorageService {
  private cachedUsername: string = null;

  cache(key: string, value: any, @Optional() ttl: number = 0): void {
    const item: LocalStorageItem = new LocalStorageItem(this.username(), value, ttl);
    localStorage.setItem(key, JSON.stringify(item))
  }

  getVersion(): string {
    return localStorage.getItem(LocalStorageKeys.LOCAL_VERSION);
  }

  get(key: string): any {
    const itemStr: string = localStorage.getItem(key);

    if (!itemStr) {
      return null;
    }

    const item: LocalStorageItem = Object.assign(LocalStorageItem, JSON.parse(itemStr));

    if ((this.username() !== item.user) || (item.ttl > 0 && (Date.now() > item.expiry))) {
      localStorage.removeItem(key);
      return null;
    }

    return JSON.parse(item.value);
  }

  remove(key: string): void {
    localStorage.removeItem(key);
  }

  private username(): string {
    if (this.cachedUsername == null) {
      let completeName = document.querySelector('#header>#playerBox>.header>div.left:nth-child(2)').textContent.split('Welcome')[1].trim();

      if (completeName.indexOf('[') == 0 && completeName.indexOf(']') == 4) {
        completeName = completeName.substring(5, completeName.length);
      }

      this.cachedUsername = completeName.toLowerCase();
    }

    return this.cachedUsername;
  }
}
