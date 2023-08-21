import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'galaxyName'
})
export class GalaxyNamePipe implements PipeTransform {

  transform(value: String): string {
    switch (value) {
      case 'all': return 'Total';
      default: return 'G' + value;
    }
  }

}
