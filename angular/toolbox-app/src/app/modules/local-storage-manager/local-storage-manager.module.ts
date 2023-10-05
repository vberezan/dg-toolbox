import {NgModule} from '@angular/core';
import {LocalStorageManagerComponent} from './component/local-storage-manager/local-storage-manager.component';
import {BrowserModule} from "@angular/platform-browser";


@NgModule({
  imports: [
    BrowserModule
  ],
  declarations: [
    LocalStorageManagerComponent
  ],
  bootstrap: [
    LocalStorageManagerComponent
  ]
})
export class LocalStorageManagerModule {
}
