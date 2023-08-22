import {inject, Pipe, PipeTransform} from '@angular/core';
import {DecimalPipe} from "@angular/common";

@Pipe({
    name: 'resourceProductionFormatter'
})
export class ResourceProductionFormatterPipe implements PipeTransform {

    private decimalPipe: DecimalPipe = inject(DecimalPipe);

    transform(value: number): string {
        return ' (+' + this.decimalPipe.transform(value, '1.0', 'en_US') + ')';
    }

}
