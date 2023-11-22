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
import {PlayersRankingsLoaderService} from "./players-rankings-loader.service";
import {DarkgalaxyApiService} from "../../../darkgalaxy-ui-parser/service/darkgalaxy-api.service";
import {PageAction} from "../../../../shared/model/stats/page-action.model";

@Injectable({
  providedIn: 'root'
})
export class SynchronizerService {
  private httpClient: HttpClient = inject(HttpClient);
  private firestore: Firestore = inject(Firestore);
  private localStorageService: LocalStorageService = inject(LocalStorageService);
  private playersRankingsLoaderService: PlayersRankingsLoaderService = inject(PlayersRankingsLoaderService);
  private _updatesEmitter: EventEmitter<number> = new EventEmitter<number>();

  private readonly ALLIANCES_URL: string = this.localStorageService.get(LocalStorageKeys.GAME_ENDPOINT) + '/alliances/';

  private _playersRankingsEmitter: EventEmitter<PageAction> = new EventEmitter<PageAction>();

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

  async loadPlanets(): Promise<void> {
    let localMetadata: Metadata = this.localStorageService.localMetadata();
    const remoteMetadata: Metadata = this.localStorageService.get(LocalStorageKeys.REMOTE_METADATA);
    const isLocalTurnZero: boolean = localMetadata.planetsTurn.turn === 0;
    const isPlanetsRemoteTurnGreater: boolean = remoteMetadata.planetsTurn.turn > localMetadata.planetsTurn.turn;
    const isPlanetsSameTurnButRemoteVersionGreater: boolean = remoteMetadata.planetsTurn.turn == localMetadata.planetsTurn.turn &&
      remoteMetadata.planetsTurn.version > localMetadata.planetsTurn.version;

    if (isLocalTurnZero || isPlanetsRemoteTurnGreater || isPlanetsSameTurnButRemoteVersionGreater) {

      this._updatesEmitter.emit(1);

      let localMetadata: Metadata = this.localStorageService.localMetadata();
      let remoteMetadata: Metadata = this.localStorageService.remoteMetadata();
      localMetadata.planetsTurn.turn = remoteMetadata.planetsTurn.turn;
      localMetadata.planetsTurn.version = remoteMetadata.planetsTurn.version;

      localMetadata.dgtVersion = remoteMetadata.dgtVersion;

      this.localStorageService.cache(LocalStorageKeys.LOCAL_METADATA, localMetadata);

      this._updatesEmitter.emit(0);
    }
  }

  loadRankings(turn: number, showPopup: Function): void {
    const localMetadata: Metadata = this.localStorageService.localMetadata();
    const playerStats = this.localStorageService.get(LocalStorageKeys.PLAYERS_STATS);
    const isPlayerRankingsTurnZero: boolean = localMetadata.playersRankingsTurn.turn === 0;
    const isNewTurn: boolean = turn > localMetadata.playersRankingsTurn.turn;

    if (!playerStats || isPlayerRankingsTurnZero || isNewTurn) {
      showPopup();
      this.loadPlayersRankings(this._playersRankingsEmitter);
    }

    const allianceMembers = this.localStorageService.get(LocalStorageKeys.ALLIANCE_MEMBERS);
    const isAllianceMembersTurnZero: boolean = localMetadata.allianceMembersTurn.turn === 0;
    const isTurnGreaterThanAllianceMembersTurn: boolean = turn > localMetadata.allianceMembersTurn.turn;

    if (playerStats && (!allianceMembers || isAllianceMembersTurnZero || isTurnGreaterThanAllianceMembersTurn)) {
      this.loadAllianceMembers(turn).catch((error: any): void => console.log(error));
    }
  }

  private loadPlayersRankings(playersRankingsEmitter: EventEmitter<PageAction>): void {
    this.playersRankingsLoaderService.scanPlayersRankingsScreens(playersRankingsEmitter).then((): void => {
      this._updatesEmitter.emit(0);
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

  get updatesEmitter(): EventEmitter<number> {
    return this._updatesEmitter;
  }

  get playersRankingsEmitter(): EventEmitter<PageAction> {
    return this._playersRankingsEmitter;
  }
}
