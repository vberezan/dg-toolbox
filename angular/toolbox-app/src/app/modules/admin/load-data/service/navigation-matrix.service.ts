import {inject, Injectable} from '@angular/core';
import {firstValueFrom} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class NavigationMatrixService {
  private httpClient: HttpClient = inject(HttpClient);

  constructor() {
  }

  generateNavigationCoordinates(): string[] {
    let result: string[] = [];
    const galaxies: number = 49;
    const g1Sectors: number = 25;
    const innerSectors: number = 6;
    const outerSectors: number = 2;
    const systems: number = 4;
    const g1Planets: number = 12;
    const innerPlanets: number = 9;
    const outerPlanets: number = 9;

    for (let galaxy: number = 1; galaxy <= galaxies; galaxy++) {
      if (galaxy === 1) {
        for (let sector: number = 1; sector <= g1Sectors; sector++) {
          for (let system: number = 1; system <= systems; system++) {
            for (let planet: number = 1; planet <= g1Planets; planet++) {
              result.push(galaxy + '.' + sector + '.' + system + '.' + planet);
            }
          }
        }
      }

      if (galaxy > 1 && galaxy < 14) {
        for (let sector: number = 1; sector <= innerSectors; sector++) {
          for (let system: number = 1; system <= systems; system++) {
            for (let planet: number = 1; planet <= innerPlanets; planet++) {
              result.push(galaxy + '.' + sector + '.' + system + '.' + planet);
            }
          }
        }
      }

      if (galaxy >= 14) {
        for (let sector: number = 1; sector <= outerSectors; sector++) {
          for (let system: number = 1; system <= systems; system++) {
            for (let planet: number = 1; planet <= outerPlanets; planet++) {
              result.push(galaxy + '.' + sector + '.' + system + '.' + planet);
            }
          }
        }
      }
    }


    return result;
  }

  async extractData(galaxy: number, sector: number, system: number): Promise<void> {
    let source:string = await firstValueFrom(this.httpClient.get('https://andromeda.darkgalaxy.com/navigation/' + galaxy + '/' + sector + '/' + system, {responseType: 'text'}));


    console.log(JSON.stringify(this.converter(document.createElement(source)), null, 4));
  }


  private converter(dom: any): any {
    if (dom.nodeType === Node.TEXT_NODE) {
      //  add only if value is not empty
      if(dom.nodeValue && dom.nodeValue.trim() != '')
        return dom.nodeValue;
    }
    if (dom.nodeType === Node.DOCUMENT_NODE) {
      dom = dom.documentElement;
    }

    const obj: any = {};

    //  add only if value is not empty
    if(dom.nodeValue && dom.nodeValue.trim() != ''){
      obj.nodeType = dom.nodeType;
    }

    if (dom.nodeType === Node.ELEMENT_NODE) {
      obj.tagName = dom.tagName;

      obj.attributes = []; // Array.from(obj.attributes) gives us a lot of things we don't want
      for (let i = 0, len = dom.attributes.length; i < len; ++i) {
        const attr = dom.attributes[i];
        obj.attributes.push({name: attr.name, value: attr.value});
      }
      //  remove attributes if is empty
      if(obj.attributes.length == 0) delete obj.attributes;

      obj.children = [];
      for (let child = dom.firstChild;child;child = child.nextSibling) {
        //  add only if value is not NULL
        var childVal = this.converter(child);
        if(childVal)
          obj.children.push(childVal);
      }
      //  remove children if is empty
      if(obj.children.length == 0) delete obj.children;

    } else {
      //  add only if value is not empty
      if(dom.nodeValue && dom.nodeValue.trim() != '')
        obj.nodeValue = dom.nodeValue;
    }

    if(obj && Object.keys(obj).length === 0 && Object.getPrototypeOf(obj) === Object.prototype){
      //  do nothing
    }else
      return obj;
  }

}
