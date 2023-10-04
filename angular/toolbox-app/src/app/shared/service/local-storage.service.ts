import { Injectable } from '@angular/core';
import {LocalStorageItem} from "../model/local-storage/local-storage-item.model";

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  // -- TODO: move all localStorage interactions to this service

  setWithExpiry(key: string, value: any, ttl: number | 7200000): void {
    const item: LocalStorageItem = new LocalStorageItem(value, ttl);
    localStorage.setItem(key, JSON.stringify(item))
  }

  getWithExpiry(key: string): any {
    const itemStr: string = localStorage.getItem(key);

    if (!itemStr) {
      return null;
    }

    const item: LocalStorageItem = Object.assign(LocalStorageItem, JSON.parse(itemStr));

    if (Date.now() > item.expiry) {
      localStorage.removeItem(key);
      return null;
    }

    return item.value;
  }
}
