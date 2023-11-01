import {NgModule} from '@angular/core';
import {OrdersPanelComponent} from './component/orders-panel/orders-panel.component';
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";
import {OrderService} from "./service/order.service";
import {initializeApp, provideFirebaseApp} from "@angular/fire/app";
import {environment} from "../../../../environments/environment";
import {getAuth, provideAuth} from "@angular/fire/auth";
import {getFirestore, provideFirestore} from "@angular/fire/firestore";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {NavigationTargetDirective} from "../../../shared/directive/navigation-target.directive";
import {WaitTurnsDirective} from "../../../shared/directive/wait-turns.directive";
import {KickMemberFormatterPipe} from './pipe/kick-member-formatter.pipe';
import {UpdateNoteFormatterPipe} from './pipe/update-note-formatter.pipe';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    FontAwesomeModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore())
  ],
  declarations: [
    OrdersPanelComponent,
    NavigationTargetDirective,
    WaitTurnsDirective,
    KickMemberFormatterPipe,
    UpdateNoteFormatterPipe
  ],
  providers: [
    OrderService
  ],
  bootstrap: [OrdersPanelComponent]
})
export class AllianceOrdersManagerModule {
}
