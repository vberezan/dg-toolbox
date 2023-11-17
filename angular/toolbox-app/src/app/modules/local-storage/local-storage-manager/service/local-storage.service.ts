import {Injectable, Optional} from '@angular/core';
import {LocalStorageItem} from "../../../../shared/model/local-storage/local-storage-item.model";
import {LocalStorageKeys} from "../../../../shared/model/local-storage/local-storage-keys";

@Injectable({
  providedIn: 'platform'
})
export class LocalStorageService {

  cache(key: string, value: any, @Optional() ttl: number = 0): void {
    const item: LocalStorageItem = new LocalStorageItem(value, ttl);
    localStorage.setItem(key, JSON.stringify(item))
  }

  get(key: string, @Optional() deleteExpired: boolean = true): any {
    const itemStr: string = localStorage.getItem(key);

    if (!itemStr) {
      return null;
    }

    const item: LocalStorageItem = Object.assign(LocalStorageItem, JSON.parse(itemStr));

    if ((item.ttl > 0 && (Date.now() > item.expiry)) && deleteExpired) {
      localStorage.removeItem(key);
      return null;
    }

    return JSON.parse(item.value);
  }

  isExpired(key: string): boolean {
    const itemStr: string = localStorage.getItem(key);

    if (!itemStr) {
      return true;
    }

    const item: LocalStorageItem = Object.assign(LocalStorageItem, JSON.parse(itemStr));

    return (item.ttl > 0 && (Date.now() > item.expiry));
  }

  remove(key: string): void {
    localStorage.removeItem(key);
  }
}
