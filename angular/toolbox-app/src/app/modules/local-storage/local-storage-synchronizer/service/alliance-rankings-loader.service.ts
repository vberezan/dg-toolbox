import {EventEmitter, inject, Injectable} from '@angular/core';
import {LocalStorageKeys} from "../../../../shared/model/local-storage/local-storage-keys";
import {LocalStorageService} from "../../local-storage-manager/service/local-storage.service";
import {HttpClient} from "@angular/common/http";
import {collection, doc, docData, Firestore} from "@angular/fire/firestore";
import {DarkgalaxyApiService} from "../../../darkgalaxy-ui-parser/service/darkgalaxy-api.service";
import {PageAction} from "../../../../shared/model/stats/page-action.model";
import {AtomicNumber} from "../../../../shared/model/atomic-number.model";
import {firstValueFrom, Subscription} from "rxjs";
import {EnemyList} from "../../../../shared/model/enemy-list";
import {DocumentData} from "@angular/fire/compat/firestore";
import {Metadata} from "../../../../shared/model/local-storage/metadata.model";
import {AllianceStats} from "../../../../shared/model/stats/alliance-stats.model";
import {AlliancePlanets} from "../../../../shared/model/stats/alliance-planets-stats.model";

@Injectable({
  providedIn: 'root'
})
export class AllianceRankingsLoaderService {
  private httpClient: HttpClient = inject(HttpClient);
  private firestore: Firestore = inject(Firestore);
  private localStorageService: LocalStorageService = inject(LocalStorageService);
  private dgAPI: DarkgalaxyApiService = inject(DarkgalaxyApiService);

  private readonly ALLIANCE_RANKINGS_URL: string = this.localStorageService.get(LocalStorageKeys.GAME_ENDPOINT) + '/rankings/alliances/';
  private readonly ALLIANCE_COMBAT_RANKINGS_URL: string = this.localStorageService.get(LocalStorageKeys.GAME_ENDPOINT) + '/rankings/combat/alliances/';

  async scanAlliancesRankingsScreens(alliancesRankingsEmitter: EventEmitter<PageAction>): Promise<void> {
    const scanDelay: number = 250 + Math.floor(Math.random() * 250);
    const alliancesPlanetsPath: any = collection(this.firestore, 'alliances-planets');

    let scanned: AtomicNumber = new AtomicNumber(0);
    let alliancesStats: Map<string, AllianceStats> = new Map<string, AllianceStats>();
    let pages: number = await this.getNumberOfPages();

    for (let page: number = 1; page <= pages; page++) {
      await this.scanRankingsPage(alliancesStats, alliancesRankingsEmitter, scanned, scanDelay, page, pages);
      await this.scanCombatRankingsPage(alliancesStats, alliancesRankingsEmitter, scanned, scanDelay, page, pages);

    }

    await this.cacheRankings(alliancesStats, alliancesPlanetsPath, alliancesRankingsEmitter, new AtomicNumber(0));
  }

  private async getNumberOfPages(): Promise<number> {
    let source: string = await firstValueFrom(this.httpClient.get(this.ALLIANCE_RANKINGS_URL, {responseType: 'text'}));
    let dom: Document = new DOMParser().parseFromString(source, 'text/html');
    if (dom.querySelector('.right.lightBorder.opacDarkBackground.padding') == null) return 1;

    return parseInt(dom.querySelector('.right.lightBorder.opacDarkBackground.padding').textContent.trim().split('of')[dom.querySelector('.right.lightBorder.opacDarkBackground.padding').textContent.trim().split('of').length - 1].trim());
  }

  private async scanRankingsPage(alliancesStats: Map<string, AllianceStats>,
                                 alliancesRankingsEmitter: EventEmitter<PageAction>,
                                 scanned: AtomicNumber,
                                 scanDelay: number,
                                 page: number,
                                 pages: number): Promise<void> {
    let source: string = await firstValueFrom(this.httpClient.get(this.ALLIANCE_RANKINGS_URL + page, {responseType: 'text'}));
    let dom: Document = new DOMParser().parseFromString(source, 'text/html');

    dom.querySelectorAll('.rankingsList .entry').forEach((row: any): void => {
      const tag: string = row.querySelector('.tag').textContent.trim().replace(/\[/g, '').replace(/]/g, '').toLowerCase();

      if (!alliancesStats.has(tag)) {
        alliancesStats.set(tag, new AllianceStats());
      }

      let alliance: AllianceStats = alliancesStats.get(tag);

      alliance.tag = tag;
      alliance.name = row.querySelector('.name').textContent.trim().toLowerCase();
      alliance.rank = parseInt(row.querySelector('.rank').textContent.trim().replace(/,/g, ''));
      alliance.score = parseInt(row.querySelector('.score').textContent.trim().replace(/,/g, ''));
      alliance.combinedScore = alliance.combatScore + alliance.score;
      alliance.membersCount = parseInt(row.querySelector('.members').textContent.trim().replace(/,/g, ''));
      alliance.avgScore = alliance.score / alliance.membersCount;
      alliance.avatar = row.querySelector('.avatar img').attributes['src'].value.trim();


      if (row.classList.contains('myRow')) {
        alliance.relation = 'self';
      } else if (row.querySelector('.hostile')) {
        alliance.relation = 'neutral';
      } else if (row.querySelector('.allied')) {
        alliance.relation = 'allied';
      }

      if (alliance.tag === 'sol') {
        alliance.relation = 'nap';
      }


      if (Object.values(EnemyList).includes(alliance.tag as EnemyList)) {
        alliance.relation = 'hostile';
      }

    });

    scanned.number += await this.atomicIncrement();
    alliancesRankingsEmitter.emit(new PageAction(scanned.number, 2 * pages, 'load'));
    await this.delay(scanDelay);
  }

  private async scanCombatRankingsPage(alliancesStats: Map<string, AllianceStats>,
                                       alliancesRankingsEmitter: EventEmitter<PageAction>,
                                       scanned: AtomicNumber,
                                       scanDelay: number,
                                       page: number,
                                       pages: number): Promise<void> {
    let source: string = await firstValueFrom(this.httpClient.get(this.ALLIANCE_COMBAT_RANKINGS_URL + page, {responseType: 'text'}));
    let dom: Document = new DOMParser().parseFromString(source, 'text/html');

    dom.querySelectorAll('.rankingsList .entry').forEach((row: any): void => {
      const tag: string = row.querySelector('.tag').textContent.trim().replace(/\[/g, '').replace(/]/g, '');

      if (!alliancesStats.has(tag)) {
        alliancesStats.set(tag, new AllianceStats());
      }

      let alliance: AllianceStats = alliancesStats.get(tag);

      alliance.combatScore = parseInt(row.querySelector('.score').textContent.trim().replace(/,/g, ''));
      alliance.combinedScore = alliance.combatScore + alliance.score;

      console.log(alliance);
    });

    scanned.number += await this.atomicIncrement();
    alliancesRankingsEmitter.emit(new PageAction(scanned.number, 2 * pages, 'load'));
    await this.delay(scanDelay);
  }

  private async cacheRankings(alliancesStats: Map<string, AllianceStats>,
                              alliancesPlanetsPath: any,
                              alliancesRankingsEmitter: EventEmitter<PageAction>,
                              saved: AtomicNumber): Promise<void> {
    let cache: AllianceStats[] = [];

    let delay: number = 0;
    alliancesStats.forEach((allianceStats: AllianceStats, tag: string): void => {
      setTimeout((): void => {
        let subscription: Subscription = docData(
          doc(alliancesPlanetsPath, tag)
        ).subscribe((item: DocumentData): void => {
          if (item) {
            const alliancePlanets: AlliancePlanets = Object.assign(new AlliancePlanets(), item);

            allianceStats.planets = alliancePlanets.total;
            allianceStats.g1Total = alliancePlanets.g1Total;
            allianceStats.g213Total = alliancePlanets.g213Total;
            allianceStats.g1449Total = alliancePlanets.g1449Total;
          } else {
            allianceStats.planets = 1;
          }

          cache.push(allianceStats);
          alliancesRankingsEmitter.emit(new PageAction(++saved.number, alliancesStats.size, 'save'));

          subscription.unsubscribe();
        });
      }, ++delay * 10);
    });

    await this.delay(10 * ++delay).finally((): void => {
      this.localStorageService.cache(LocalStorageKeys.ALLIANCES_STATS, cache);
      let localMetadata: Metadata = this.localStorageService.localMetadata();
      this.localStorageService.cache(LocalStorageKeys.LOCAL_METADATA, localMetadata);
    });
  }

  private delay = async (ms: number): Promise<unknown> => new Promise(res => setTimeout(res, ms));

  private async atomicIncrement(): Promise<number> {
    return 1;
  }
}
