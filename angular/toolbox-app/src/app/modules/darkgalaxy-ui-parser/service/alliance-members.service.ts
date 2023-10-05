import {inject, Injectable} from '@angular/core';
import {DataExtractor} from "./data-extractor";
import {AllianceMember} from "../../../shared/model/orders/alliance-member.model";
import {LocalStorageService} from "../../local-storage-manager/service/local-storage.service";
import {LocalStorageKeys} from "../../../shared/model/local-storage/local-storage-keys";

@Injectable({
  providedIn: 'platform'
})
export class AllianceMembersService implements DataExtractor {
  private localStorageService: LocalStorageService = inject(LocalStorageService);

  extract(): AllianceMember[] {
    let result: AllianceMember[] = this.localStorageService.get(LocalStorageKeys.ALLIANCE_MEMBERS) || [];

    if (result.length == 0 && !document.querySelector('[action="/alliances/join/"]')) {

      document.querySelectorAll('.allianceBox').forEach((allianceBox: any): void => {
        if (allianceBox.querySelector('.plainHeader').childNodes[0].textContent.trim().toLowerCase() === 'member list') {
          allianceBox.querySelectorAll('.player').forEach((player: any): void => {
            let allianceMember: AllianceMember = new AllianceMember();

            if (player.querySelector('div.note') != null) {
              allianceMember.note = player.querySelector('div.note').childNodes[0].textContent.trim();
            } else if (player.querySelector('input[name="note"]') != null) {
              allianceMember.note = player.querySelector('input[name="note"]').value.trim();
            }

            if (player.querySelector('[action^="/alliances/note/"]') != null) {
              let idArray = player.querySelector('[action^="/alliances/note/"]').getAttribute('action').trim().toLocaleLowerCase().split(/\//g);
              allianceMember.dgId = idArray[idArray.length - 2];
            }

            if (player.querySelector('[action="/alliances/kick/"] input') == null && player.querySelector('.right>b') != null) {
              allianceMember.kickEta = player.querySelector('.right>b').textContent.trim().toLowerCase();
            }


            if (player.querySelector('div.name') != null) {
              allianceMember.name = player.querySelector('div.name').childNodes[0].textContent.trim();
              result.push(allianceMember);
            }
          });
        }
      });

      this.localStorageService.cache(LocalStorageKeys.ALLIANCE_MEMBERS, result, 43200000);
    }

    return result;
  }

  cleanAfterExtract(): void {
    if (document.querySelector('.dgt-orders-manager-panel.user')) {
      document.querySelector('.dgt-orders-manager-panel.user').remove();
    }

    document.querySelectorAll('.allianceBox').forEach((allianceBox: any): void => {
      if (allianceBox.querySelector('.plainHeader').childNodes[0].textContent.trim().toLowerCase() === 'member list') {
        allianceBox.querySelector('.plainHeader').remove();
        allianceBox.querySelector('.playerList').remove();
      }
    });
  }

}
