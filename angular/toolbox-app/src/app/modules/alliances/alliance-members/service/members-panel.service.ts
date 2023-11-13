import {ElementRef, Injectable} from '@angular/core';
import {AllianceMember} from "../../../../shared/model/alliances/alliance-member.model";
import {AllianceMemberStats} from "../../../../shared/model/alliances/alliance-member-stats.model";

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

  showComponent(): void {
    let loadSpinner: Element = document.querySelector('.dgt-spinner-container');
    let mainContainer: Element = document.querySelector('.dgt-alliance-members-panel');

    console.log(loadSpinner);
    console.log(mainContainer);

    if (loadSpinner != null && loadSpinner.classList.contains('show')) {
      loadSpinner.classList.add('hide');
      loadSpinner.classList.remove('show');
    }

    if (mainContainer != null && mainContainer.classList.contains('hide')) {
      mainContainer.classList.add('show');
      mainContainer.classList.remove('hide');
    }
  }

  setStats(allianceMembers: AllianceMember[], stats: AllianceMemberStats): void {
    allianceMembers.forEach((member: AllianceMember): void => {
      if (member.name.toLowerCase() === stats.name) {
        member.stats.score = stats.score;
        member.stats.combatScore = stats.combatScore;
        member.stats.planets = stats.planets;
        member.stats.rank = stats.rank;
      }
    });
  }
}
