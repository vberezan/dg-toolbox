import { NgModule } from '@angular/core';
import { AdminPanelComponent } from './component/admin-panel/admin-panel.component';
import {BrowserModule} from "@angular/platform-browser";
import { HttpClientModule} from "@angular/common/http";
import { AllianceListDirective } from './directive/alliance-list.directive';
import {FormsModule} from "@angular/forms";
import {getApp, initializeApp, provideFirebaseApp} from "@angular/fire/app";
import {environment} from "../../../../environments/environment";
import {getAuth, provideAuth} from "@angular/fire/auth";
import {getFirestore, provideFirestore} from "@angular/fire/firestore";
import {initializeAppCheck, provideAppCheck, ReCaptchaV3Provider} from "@angular/fire/app-check";
import {MetadataService} from "../../local-storage/local-storage-synchronizer/service/metadata.service";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideAppCheck(() => initializeAppCheck(getApp(),
      {
        provider: new ReCaptchaV3Provider(environment.firebase.appCheck.recaptchaSiteKey),
        isTokenAutoRefreshEnabled: true
      })
    ),
  ],
  providers: [
    MetadataService // -- contains reference to firestore
  ],
  declarations: [
    AdminPanelComponent,
    AllianceListDirective
  ],
  bootstrap: [
    AdminPanelComponent
  ]
})
export class LoadDataModule { }
