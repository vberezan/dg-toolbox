import {inject, Pipe, PipeTransform} from '@angular/core';
import {DecimalPipe} from "@angular/common";

@Pipe({
  name: 'scorePerPlanetFormatter'
})
export class ScorePerPlanetFormatter implements PipeTransform {

  private decimalPipe: DecimalPipe = inject(DecimalPipe);

  transform(score: number, planets: number): string {
    return this.decimalPipe.transform(Math.round(score / planets), '1.0', 'en_US');
  }

}
