import {Injectable, Optional} from '@angular/core';
import {LocalStorageItem} from "../../../shared/model/local-storage/local-storage-item.model";

@Injectable({
  providedIn: 'platform'
})
export class LocalStorageService {
  private readonly instanceId: number;
  private id: number;

  constructor() {
    this.id = Math.random();
    this.instanceId = Math.random();
  }

  cache(key: string, value: any, @Optional() ttl: number = 0): void {
    console.log(this.id);
    const item: LocalStorageItem = new LocalStorageItem(this.instanceId, value, ttl);
    localStorage.setItem(key, JSON.stringify(item))
  }

  get(key: string): any {
    console.log(this.id);
    const itemStr: string = localStorage.getItem(key);

    if (!itemStr) {
      return null;
    }

    const item: LocalStorageItem = Object.assign(LocalStorageItem, JSON.parse(itemStr));

    if (item.ttl > 0 && (Date.now() > item.expiry)) {
      localStorage.removeItem(key);
      return null;
    }

    return JSON.parse(item.value);
  }

  remove(key: string): void {
    console.log(this.id);
    localStorage.removeItem(key);
  }
}
