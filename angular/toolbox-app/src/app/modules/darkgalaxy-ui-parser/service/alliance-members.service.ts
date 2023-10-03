import {Injectable} from '@angular/core';
import {DataExtractor} from "./data-extractor";
import {AllianceMember} from "../../../shared/model/orders/alliance-member.model";

@Injectable({
  providedIn: 'root'
})
export class AllianceMembersService implements DataExtractor {

  constructor() {
  }

  extract(): AllianceMember[] {
    let result: AllianceMember[] = [];

    if (!document.querySelector('[action="/alliances/join/"]')) {
      document.querySelectorAll('.allianceBox > .playerList').forEach((list: any): void => {
        if (list.parentElement.querySelector('.plainHeader').childNodes[0].textContent.trim().toLowerCase() === 'member list') {
          list.querySelectorAll('.player').forEach((player: any): void => {
            let allianceMember: AllianceMember = new AllianceMember();

            if (player.querySelector('div.note') != null) {
              allianceMember.note = player.querySelector('div.note').childNodes[0].textContent.trim();
            }

            if (player.querySelector('[action^="/alliances/note/"]') != null) {
              let idArray = player.querySelector('[action^="/alliances/note/"]').getAttribute('action').trim().toLocaleLowerCase().split(/\//g);
              allianceMember.dgId = idArray[idArray.length - 2];
            }

            if (player.querySelector('[action="/alliances/kick/"] input') == null) {
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

    return result;
  }

  cleanAfterExtract(): void {
    let element: Element = document.querySelector('.allianceBox .playerList');

    if (element) {
      element.parentNode.querySelector('.plainHeader').remove();
      element.remove();
    }
  }

}
