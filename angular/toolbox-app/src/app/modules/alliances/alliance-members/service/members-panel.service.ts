import {ElementRef, inject, Injectable} from '@angular/core';
import {AllianceMember} from "../../../../shared/model/alliances/alliance-member.model";
import {LocalStorageService} from "../../../local-storage/local-storage-manager/service/local-storage.service";
import {LocalStorageKeys} from "../../../../shared/model/local-storage/local-storage-keys";

@Injectable({
  providedIn: 'root'
})
export class MembersPanelService {
  private localStorageService: LocalStorageService = inject(LocalStorageService);

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

  fetchAndClean(): AllianceMember[] {
    let result: AllianceMember[] = this.localStorageService.get(LocalStorageKeys.ALLIANCE_MEMBERS) || [];

    document.querySelectorAll('.allianceBox').forEach((allianceBox: any): void => {
      if (allianceBox.querySelector('.plainHeader') &&
        allianceBox.querySelector('.plainHeader').childNodes[0].textContent.trim().toLowerCase() === 'member list') {
        allianceBox.querySelector('.plainHeader').remove();
        allianceBox.querySelector('.playerList').remove();
      }
    });

    return result;
  }
}
