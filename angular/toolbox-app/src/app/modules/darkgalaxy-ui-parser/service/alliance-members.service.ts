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
            let name: string = null;
            let note: string = null;

            if (player.querySelector('div.note') != null) {
              note = player.querySelector('div.note').childNodes[0].textContent.trim();
            }

            if (player.querySelector('div.name') != null) {
              name = player.querySelector('div.name').childNodes[0].textContent.trim();
              result.push(new AllianceMember(name, note));
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
