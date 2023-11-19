import {EventEmitter, inject, Injectable} from '@angular/core';
import {collection, collectionData, Firestore, query} from "@angular/fire/firestore";
import {LocalStorageService} from "../../local-storage-manager/service/local-storage.service";
import {firstValueFrom, Subscriber, Subscription} from "rxjs";
import {DocumentData} from "@angular/fire/compat/firestore";
import {LocalStorageKeys} from "../../../../shared/model/local-storage/local-storage-keys";
import {PlayerStats} from "../../../../shared/model/stats/player-stats.model";
import {HttpClient} from "@angular/common/http";
import {AllianceMember} from "../../../../shared/model/alliances/alliance-member.model";
import {Metadata} from "../../../../shared/model/local-storage/metadata.model";
import {environment} from "../../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class SynchronizerService {
  private httpClient: HttpClient = inject(HttpClient);
  private firestore: Firestore = inject(Firestore);
  private localStorageService: LocalStorageService = inject(LocalStorageService);
  private _updatesEmitter: EventEmitter<number> = new EventEmitter<number>();

  private readonly ALLIANCES_URL: string = this.localStorageService.get(LocalStorageKeys.GAME_ENDPOINT) + '/alliances/';

  updateMetadata(observer: Subscriber<boolean>): void {
    const metadataPath: any = collection(this.firestore, 'metadata');

    let subscription: Subscription = collectionData(
      query(metadataPath),
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

    if (localMetadata.planetsTurn.turn === 0 ||
      remoteMetadata.planetsTurn.turn > localMetadata.planetsTurn.turn ||
      (remoteMetadata.planetsTurn.turn == localMetadata.planetsTurn.turn &&
        remoteMetadata.planetsTurn.version > localMetadata.planetsTurn.version)) {
      this._updatesEmitter.emit(1);

      let localMetadata: Metadata = this.localStorageService.localMetadata();
      let remoteMetadata: Metadata = this.localStorageService.remoteMetadata();
      localMetadata.planetsTurn.turn = remoteMetadata.planetsTurn.turn;
      localMetadata.planetsTurn.version = remoteMetadata.planetsTurn.version;

      this.localStorageService.cache(LocalStorageKeys.LOCAL_METADATA, localMetadata);
      this._updatesEmitter.emit(-1);
    }

    if (localMetadata.playersRankingsTurn.turn === 0 ||
      remoteMetadata.playersRankingsTurn.turn > localMetadata.playersRankingsTurn.turn ||
      (remoteMetadata.playersRankingsTurn.turn == localMetadata.playersRankingsTurn.turn &&
        remoteMetadata.playersRankingsTurn.version > localMetadata.playersRankingsTurn.version)) {

      this.loadPlayersRankings(turn);
    }

    if (this.localStorageService.get(LocalStorageKeys.PLAYERS_STATS) &&
      (this.localStorageService.get(LocalStorageKeys.ALLIANCE_MEMBERS) == null ||
        localMetadata.allianceMembersTurn.turn === 0 || turn > localMetadata.allianceMembersTurn.turn)) {

      this.loadAllianceMembers(turn);
    }


  }

  loadGameEndpoint(): void {
    this.localStorageService.cache(LocalStorageKeys.GAME_ENDPOINT, window.location.origin);
  }

  private loadPlayersRankings(turn: number): void {
    this._updatesEmitter.emit(1);
    const playersRankingsPath: any = collection(this.firestore, 'players-rankings');

    let subscription: Subscription = collectionData(playersRankingsPath)
      .subscribe((items: DocumentData[]): void => {
        let playerStats: PlayerStats[] = Object.assign([], items);

        this.localStorageService.cache(LocalStorageKeys.PLAYERS_STATS, playerStats);

        let localMetadata: Metadata = this.localStorageService.localMetadata();
        let remoteMetadata: Metadata = this.localStorageService.remoteMetadata();
        localMetadata.playersRankingsTurn.turn = remoteMetadata.playersRankingsTurn.turn;
        localMetadata.playersRankingsTurn.version = remoteMetadata.playersRankingsTurn.version;

        this.localStorageService.cache(LocalStorageKeys.LOCAL_METADATA, localMetadata);

        subscription.unsubscribe();
        this.delay(1000).then((): void => {
          this._updatesEmitter.emit(-1);
        });

        this._updatesEmitter.emit(1);
        this.loadAllianceMembers(turn).then((): void => {
          this.delay(1000).then((): void => {
            this._updatesEmitter.emit(-1);
          });
        });
      });
  }

  private async loadAllianceMembers(turn: number): Promise<void> {
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

  private delay = async (ms: number): Promise<unknown> => new Promise(res => setTimeout(res, ms));

  get updatesEmitter(): EventEmitter<number> {
    return this._updatesEmitter;
  }
}
