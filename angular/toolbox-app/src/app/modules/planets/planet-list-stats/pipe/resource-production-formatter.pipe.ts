import {inject, Pipe, PipeTransform} from '@angular/core';
import {DecimalPipe} from "@angular/common";

@Pipe({
  name: 'resourceProductionFormatter'
})
export class ResourceProductionFormatterPipe implements PipeTransform {

  private decimalPipe: DecimalPipe = inject(DecimalPipe);

  transform(value: number): string {
    if (isNaN(value)) {
      return ' [N/A]';
    } else if (value === 0) {
      return ' [0.0]'
    } else {
      return ' [+' + this.decimalPipe.transform(value, '1.0', 'en_US') + ']';
    }
  }

}
