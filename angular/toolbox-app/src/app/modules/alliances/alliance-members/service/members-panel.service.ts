import { Injectable } from '@angular/core';
import {AllianceMember} from "../../../../shared/model/alliances/alliance-member.model";

@Injectable({
  providedIn: 'root'
})
export class MembersPanelService {

  sortMembersByScore(allianceMembers: AllianceMember[]): void {
    for (let i: number = 0; i < allianceMembers.length - 1; i++) {
      for (let j: number = i + 1; j < allianceMembers.length; j++) {
        if (allianceMembers[i].stats && allianceMembers[j].stats &&
          allianceMembers[i].stats.score < allianceMembers[j].stats.score) {

          let aux: AllianceMember = allianceMembers[i];
          allianceMembers[i] = allianceMembers[j];
          allianceMembers[j] = aux;
        }
      }
    }
  }
}
