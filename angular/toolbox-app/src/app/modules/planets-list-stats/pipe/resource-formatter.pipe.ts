import {inject, Pipe, PipeTransform} from '@angular/core';
import {DecimalPipe} from "@angular/common";

@Pipe({
    name: 'resourceFormatter'
})
export class ResourceFormatterPipe implements PipeTransform {

    private decimalPipe: DecimalPipe = inject(DecimalPipe);

    transform(value: number, ...args: number[]): string {
        return this.decimalPipe.transform(value, '1.0', 'en_US')
            + ' (+'
            + this.decimalPipe.transform(args[0], '1.0', 'en_US')
            + ')';
    }

}
