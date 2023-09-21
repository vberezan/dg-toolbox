import {Injectable} from '@angular/core';
import {DataExtractor} from "./data-extractor";

@Injectable({
  providedIn: 'root'
})
export class AllianceMembersService implements DataExtractor {

  constructor() {
  }

  extract(): string[] {
    let result: string[] = [];

    document.querySelectorAll('.allianceBox .playerList div.name').forEach((playerName: any) => {
      result.push(playerName.childNodes[0].textContent.trim().toLowerCase());
    });

    return result;
  }


}
