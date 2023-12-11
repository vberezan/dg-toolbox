import {EventEmitter, inject, Injectable, Optional} from '@angular/core';
import {collection, collectionData, doc, docData, Firestore, query, setDoc, updateDoc} from "@angular/fire/firestore";
import {LocalStorageService} from "../../local-storage-manager/service/local-storage.service";
import {firstValueFrom, Subscriber, Subscription} from "rxjs";
import {DocumentData} from "@angular/fire/compat/firestore";
import {LocalStorageKeys} from "../../../../shared/model/local-storage/local-storage-keys";
import {PlayerStats} from "../../../../shared/model/stats/player-stats.model";
import {HttpClient} from "@angular/common/http";
import {AllianceMember} from "../../../../shared/model/alliances/alliance-member.model";
import {Metadata} from "../../../../shared/model/local-storage/metadata.model";
import {PlayersRankingsLoaderService} from "./players-rankings-loader.service";
import {PageAction} from "../../../../shared/model/stats/page-action.model";
import {UserStatus} from "../../../../shared/model/local-storage/user-status.model";
import {DarkgalaxyApiService} from "../../../darkgalaxy-ui-parser/service/darkgalaxy-api.service";
import {AllianceRankingsLoaderService} from "./alliance-rankings-loader.service";

@Injectable({
  providedIn: 'root'
})
export class SynchronizerService {
  private httpClient: HttpClient = inject(HttpClient);
  private firestore: Firestore = inject(Firestore);
  private localStorageService: LocalStorageService = inject(LocalStorageService);
  private playersRankingsLoaderService: PlayersRankingsLoaderService = inject(PlayersRankingsLoaderService);
  private allianceRankingsLoaderService: AllianceRankingsLoaderService = inject(AllianceRankingsLoaderService);
  private dgAPI: DarkgalaxyApiService = inject(DarkgalaxyApiService);
  private _updatesEmitter: EventEmitter<number> = new EventEmitter<number>();

  private readonly ALLIANCES_URL: string = this.localStorageService.get(LocalStorageKeys.GAME_ENDPOINT) + '/alliances/';

  private _playersRankingsEmitter: EventEmitter<PageAction> = new EventEmitter<PageAction>();
  private _alliancesRankingsEmitter: EventEmitter<PageAction> = new EventEmitter<PageAction>();

  updateMetadata(observer: Subscriber<boolean>): void {
    const metadataPath: any = collection(this.firestore, 'metadata');
    const userStatusPath: any = collection(this.firestore, 'user-status');

    let metadataSubscription: Subscription = collectionData(
      query(metadataPath)
    ).subscribe((item: DocumentData[]): void => {
      const metadata: any = Object.assign([], item);

      let cache: Metadata = new Metadata();

      cache.dgtVersion = metadata[0].version;
      cache.planetsTurn = metadata[1];
      cache.playersRankingsTurn = metadata[2];

      this.localStorageService.cache(LocalStorageKeys.REMOTE_METADATA, cache);

      let userStatusSubscription: Subscription = docData(
        doc(userStatusPath, this.dgAPI.username()),
      ).subscribe((item: DocumentData): void => {
        if (item) {
          let userStatus: UserStatus = Object.assign(new UserStatus(), item);
          userStatus.turn = this.dgAPI.gameTurn();
          userStatus.version = this.localStorageService.localMetadata().dgtVersion
          updateDoc(doc(userStatusPath, this.dgAPI.username()), JSON.parse(JSON.stringify(userStatus))).catch((error: any): void => console.log(error));
        } else {
          let userStatus: UserStatus = new UserStatus();
          userStatus.turn = this.dgAPI.gameTurn();
          userStatus.version = this.localStorageService.localMetadata().dgtVersion;
          userStatus.name = this.dgAPI.username();
          setDoc(doc(userStatusPath, this.dgAPI.username()), JSON.parse(JSON.stringify(userStatus))).catch((error: any): void => console.log(error));
        }

        observer.next(true);
        observer.complete();

        userStatusSubscription.unsubscribe();
      });

      metadataSubscription.unsubscribe();
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
      let localMetadata: Metadata = this.localStorageService.localMetadata();
      let remoteMetadata: Metadata = this.localStorageService.remoteMetadata();
      localMetadata.planetsTurn.turn = remoteMetadata.planetsTurn.turn;
      localMetadata.planetsTurn.version = remoteMetadata.planetsTurn.version;

      localMetadata.playersRankingsTurn.turn = 0;
      this.localStorageService.remove(LocalStorageKeys.PLAYERS_STATS);

      this.localStorageService.cache(LocalStorageKeys.LOCAL_METADATA, localMetadata);
    }

    this._updatesEmitter.emit(-1);
  }

  loadRankings(turn: number, @Optional() force: boolean = false): void {
    const localMetadata: Metadata = this.localStorageService.localMetadata();
    const playerStats: PlayerStats[] = this.localStorageService.get(LocalStorageKeys.PLAYERS_STATS);
    const isPlayerRankingsTurnZero: boolean = localMetadata.playersRankingsTurn.turn === 0;
    const isNewTurn: boolean = turn > localMetadata.playersRankingsTurn.turn;

    if (!playerStats || playerStats.length == 0 || isPlayerRankingsTurnZero || isNewTurn || force) {
      if (window.location.pathname.indexOf('/rankings/players') !== -1 || window.location.pathname.indexOf('/alliances') !== -1) {
        this._updatesEmitter.emit(2);
        this.loadAllRankings(this._playersRankingsEmitter, this._alliancesRankingsEmitter);
      }
    }

    const allianceMembers: AllianceMember[] = this.localStorageService.get(LocalStorageKeys.ALLIANCE_MEMBERS);
    const isAllianceMembersTurnZero: boolean = localMetadata.allianceMembersTurn.turn === 0;
    const isTurnGreaterThanAllianceMembersTurn: boolean = turn > localMetadata.allianceMembersTurn.turn;

    if (playerStats && (!allianceMembers || allianceMembers.length == 0 || isAllianceMembersTurnZero || isTurnGreaterThanAllianceMembersTurn)) {
      if (window.location.pathname.indexOf('/alliances') !== -1) {
        this._updatesEmitter.emit(1);
        this.loadAllianceMembers(turn).finally((): void => {
          this._updatesEmitter.emit(0);
        }).catch((error: any): void => console.log(error));
      }
    }
  }

  private loadAllRankings(playersRankingsEmitter: EventEmitter<PageAction>, alliancesRankingsEmitter: EventEmitter<PageAction>): void {
    this.playersRankingsLoaderService.scanPlayersRankingsScreens(playersRankingsEmitter).finally((): void => {
      this._updatesEmitter.emit(2);
      this.allianceRankingsLoaderService.scanAlliancesRankingsScreens(alliancesRankingsEmitter).finally((): void => {
        this._updatesEmitter.emit(1);
        this.loadAllianceMembers(this.localStorageService.localMetadata().playersRankingsTurn.turn).finally((): void => {
          this._updatesEmitter.emit(0);
        });
      });
    });
  }


  private async loadAllianceMembers(turn: number): Promise<void> {
    const source: string = await firstValueFrom(this.httpClient.get(this.ALLIANCES_URL, {responseType: 'text'}));
    const dom: Document = new DOMParser().parseFromString(source, 'text/html');
    const playerStats: PlayerStats[] = this.localStorageService.get(LocalStorageKeys.PLAYERS_STATS);
    const userStatusPath: any = collection(this.firestore, 'user-status');

    let userStatsSubscription: Subscription = collectionData(
      query(userStatusPath)
    ).subscribe((item: DocumentData[]): void => {
      const userStats: any = Object.assign([], item);

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
                allianceMember.stats = playerStats.find((playerStat: PlayerStats): boolean => playerStat.name.trim().toLowerCase() === allianceMember.name.toLowerCase());
                const userStatus: UserStatus = userStats.find((userStat: UserStatus): boolean => userStat.name.trim().toLowerCase() === allianceMember.name.toLowerCase());

                if (userStatus) {
                  allianceMember.dgtVersion = userStatus.version;
                }

                cache.push(allianceMember);
              }
            });
          }
        });

        let localMetadata: Metadata = this.localStorageService.localMetadata();
        localMetadata.allianceMembersTurn.turn = turn;

        this.localStorageService.cache(LocalStorageKeys.ALLIANCE_MEMBERS, cache);
        this.localStorageService.cache(LocalStorageKeys.LOCAL_METADATA, localMetadata);

        userStatsSubscription.unsubscribe();
      }
    });
  }

  get updatesEmitter(): EventEmitter<number> {
    return this._updatesEmitter;
  }

  get playersRankingsEmitter(): EventEmitter<PageAction> {
    return this._playersRankingsEmitter;
  }

  get alliancesRankingsEmitter(): EventEmitter<PageAction> {
    return this._alliancesRankingsEmitter;
  }
}
