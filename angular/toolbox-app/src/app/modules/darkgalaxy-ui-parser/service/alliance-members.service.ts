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
      document.querySelectorAll('.allianceBox .playerList .player').forEach((player: any): void => {
        console.log (player);

        let name: string = player.querySelector('.name').childNodes[0].textContent.trim();
        let note: string = player.querySelector('.note').childNodes[0].textContent.trim();

        result.push(new AllianceMember(name, note));
      });
    }

    return result;
  }


}
