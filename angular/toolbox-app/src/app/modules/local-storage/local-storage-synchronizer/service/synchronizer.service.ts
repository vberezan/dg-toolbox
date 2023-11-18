import {inject, Injectable} from '@angular/core';
import {collection, collectionData, doc, docData, Firestore, limit, query, setDoc, updateDoc, where} from "@angular/fire/firestore";
import {LocalStorageService} from "../../local-storage-manager/service/local-storage.service";
import {firstValueFrom, Subscriber, Subscription} from "rxjs";
import {DocumentData} from "@angular/fire/compat/firestore";
import {LocalStorageKeys} from "../../../../shared/model/local-storage/local-storage-keys";
import {PlayerStats} from "../../../../shared/model/stats/player-stats.model";
import {HttpClient} from "@angular/common/http";
import {AllianceMember} from "../../../../shared/model/alliances/alliance-member.model";
import {Metadata} from "../../../../shared/model/local-storage/metadata.model";

@Injectable({
  providedIn: 'root'
})
export class SynchronizerService {
  private readonly ALLIANCES_URL: string = 'https://andromeda.darkgalaxy.com/alliances/';

  private httpClient: HttpClient = inject(HttpClient);
  private firestore: Firestore = inject(Firestore);
  private localStorageService: LocalStorageService = inject(LocalStorageService);


  constructor() {
  }

  updateMetadata(observer: Subscriber<boolean>): void {
    const metadataPath: any = collection(this.firestore, 'metadata');

    let subscription: Subscription = collectionData(
      query(metadataPath)
    ).subscribe((item: DocumentData[]): void => {
      const metadata: any = Object.assign([], item);

      let cache: Metadata = new Metadata();

      cache.dgtVersion = metadata[0].version;
      cache.planetsTurn = metadata[1];
      cache.playersRankingsTurn = metadata[2];

      this.localStorageService.cache(LocalStorageKeys.REMOTE_METADATA, cache);

      observer.next(true);
      observer.complete();

      subscription.unsubscribe();
    });
  }

  loadTurnBasedUpdates(turn: number): void {
    let localMetadata: Metadata = this.localStorageService.localMetadata();
    let remoteMetadata: Metadata = this.localStorageService.get(LocalStorageKeys.REMOTE_METADATA);


    if (localMetadata.playersRankingsTurn.turn === 0 ||
      remoteMetadata.playersRankingsTurn.turn > localMetadata.playersRankingsTurn.turn ||
      remoteMetadata.playersRankingsTurn.version > localMetadata.playersRankingsTurn.version) {

      this.loadPlayersRankings(turn);
      this.loadAllianceMembers(turn);
    }

    if (this.localStorageService.get(LocalStorageKeys.ALLIANCE_MEMBERS) == null ||
      localMetadata.allianceMembersTurn.turn === 0 || turn > localMetadata.allianceMembersTurn.turn) {
      this.loadAllianceMembers(turn);
    }
  }

  loadLiveUpdates(): void {
  }

  private loadPlayersRankings(turn: number): void {
    const playersRankingsPath: any = collection(this.firestore, 'players-rankings');


    let subscription: Subscription = collectionData(playersRankingsPath)
      .subscribe((items: DocumentData[]): void => {
        let playerStats: PlayerStats[] = Object.assign([], items);

        this.localStorageService.cache(LocalStorageKeys.PLAYERS_STATS, playerStats);

        let localMetadata: Metadata = this.localStorageService.localMetadata();
        localMetadata.playersRankingsTurn.turn = turn;

        this.localStorageService.cache(LocalStorageKeys.LOCAL_METADATA, localMetadata);

        subscription.unsubscribe();
      });
  }

  private async loadAllianceMembers(turn: number) {
    const source: string = await firstValueFrom(this.httpClient.get(this.ALLIANCES_URL, {responseType: 'text'}));
    const dom: Document = new DOMParser().parseFromString(source, 'text/html');
    const playerStats: PlayerStats[] = this.localStorageService.get(LocalStorageKeys.PLAYERS_STATS);

    if (!dom.querySelector('[action="/alliances/join/"]')) {

      let cache: AllianceMember[] = [];

      dom.querySelectorAll('.allianceBox').forEach((allianceBox: any): void => {
        if (allianceBox.querySelector('.plainHeader') &&
          allianceBox.querySelector('.plainHeader').childNodes[0].textContent.trim().toLowerCase() === 'member list') {
          allianceBox.querySelectorAll('.player').forEach((player: any): void => {
            let allianceMember: AllianceMember = new AllianceMember();

            if (player.querySelector('[action^="/alliances/note/"]') != null) {
              let idArray = player.querySelector('[action^="/alliances/note/"]').getAttribute('action').trim().toLocaleLowerCase().split(/\//g);
              allianceMember.dgId = idArray[idArray.length - 2];
            }

            if (player.querySelector('[action="/alliances/kick/"] input') == null && player.querySelector('.right>b') != null) {
              allianceMember.kickEta = player.querySelector('.right>b').textContent.trim().toLowerCase();
            }


            if (player.querySelector('div.name') != null) {
              allianceMember.name = player.querySelector('div.name').childNodes[0].textContent.trim();
              allianceMember.stats = playerStats.find((playerStat: PlayerStats): boolean => playerStat.name.toLowerCase() === allianceMember.name.toLowerCase());
              cache.push(allianceMember);
            }
          });
        }
      });

      let localMetadata: Metadata = this.localStorageService.localMetadata();
      localMetadata.allianceMembersTurn.turn = turn;

      this.localStorageService.cache(LocalStorageKeys.ALLIANCE_MEMBERS, cache);
      this.localStorageService.cache(LocalStorageKeys.LOCAL_METADATA, localMetadata);
    }
  }
}
