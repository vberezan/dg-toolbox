import {inject, Injectable} from '@angular/core';
import {DataExtractor} from "./data-extractor";
import {AllianceMember} from "../../../shared/model/orders/alliance-member.model";
import {LocalStorageService} from "../../../shared/service/local-storage.service";
import {LocalStorageKeys} from "../../../shared/model/local-storage/local-storage-keys";

@Injectable({
  providedIn: 'root'
})
export class AllianceMembersService implements DataExtractor {
  private localStorageService: LocalStorageService = inject(LocalStorageService);

  extract(): AllianceMember[] {
    let local: AllianceMember[] = Object.assign([], this.localStorageService.getWithExpiry(LocalStorageKeys.ALLIANCE_MEMBERS));

    if (local != null) {

      console.log(local[0], local[0].name);

      return local;
    }

    let result: AllianceMember[] = [];
    if (!document.querySelector('[action="/alliances/join/"]')) {
      document.querySelectorAll('.allianceBox > .playerList').forEach((list: any): void => {
        if (list.parentElement.querySelector('.plainHeader').childNodes[0].textContent.trim().toLowerCase() === 'member list') {
          list.querySelectorAll('.player').forEach((player: any): void => {
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
    }

    this.localStorageService.setWithExpiry(LocalStorageKeys.ALLIANCE_MEMBERS, result, 43200000);

    return result;
  }

  cleanAfterExtract(): void {
    document.querySelectorAll('.allianceBox > .playerList').forEach((list: any): void => {
      if (list.parentElement.querySelector('.plainHeader').childNodes[0].textContent.trim().toLowerCase() === 'member list') {
        list.parentNode.querySelector('.plainHeader').remove();
        list.remove();
      }
    });
  }

}
