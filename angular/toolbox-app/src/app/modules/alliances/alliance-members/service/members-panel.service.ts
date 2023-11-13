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

  showComponent(loadSpinner: ElementRef, mainContainer: ElementRef): void {
    if (loadSpinner.nativeElement && loadSpinner.nativeElement.classList.contains('show')) {
      loadSpinner.nativeElement.classList.add('hide');
      loadSpinner.nativeElement.classList.remove('show');
    }

    if (mainContainer.nativeElement && mainContainer.nativeElement.classList.contains('hide')) {
      mainContainer.nativeElement.classList.add('show');
      mainContainer.nativeElement.classList.remove('hide');
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
