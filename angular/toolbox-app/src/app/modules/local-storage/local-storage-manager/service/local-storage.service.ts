import {Injectable, Optional} from '@angular/core';
import {LocalStorageItem} from "../../../../shared/model/local-storage/local-storage-item.model";
import {LocalStorageKeys} from "../../../../shared/model/local-storage/local-storage-keys";
import {Metadata} from "../../../../shared/model/local-storage/metadata.model";

@Injectable({
  providedIn: 'platform'
})
export class LocalStorageService {


  clearAll(): void {
    localStorage.clear();
  }

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

  remoteMetadata(): Metadata {
    return this.get(LocalStorageKeys.REMOTE_METADATA);
  }

  localMetadata(): Metadata {
    return this.get(LocalStorageKeys.LOCAL_METADATA);
  }

  remove(key: string): void {
    localStorage.removeItem(key);
  }
}
