import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'galaxyNameFormatter'
})
export class GalaxyNameFormatterPipe implements PipeTransform {

  transform(value: String): string {
    switch (value) {
      case 'all': return 'Total';
      case '0' : return 'Home'
      default: return 'G' + value;
    }
  }

}
