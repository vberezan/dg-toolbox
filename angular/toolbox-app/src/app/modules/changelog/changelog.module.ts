import {NgModule} from '@angular/core';
import {ChangelogComponent} from './component/changelog/changelog.component';
import {BrowserModule} from "@angular/platform-browser";
import {ChangelogService} from "./service/changelog.service";
import {initializeApp, provideFirebaseApp} from "@angular/fire/app";
import {environment} from "../../../environments/environment";
import {getFirestore, provideFirestore} from "@angular/fire/firestore";


@NgModule({
  imports: [
    BrowserModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore())
  ],
  declarations: [
    ChangelogComponent
  ],
  providers: [
    ChangelogService
  ],
  bootstrap: [
    ChangelogComponent
  ]
})
export class ChangelogModule {
}
