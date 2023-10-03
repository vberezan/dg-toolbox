import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'kickMemberFormatter'
})
export class KickMemberFormatterPipe implements PipeTransform {

  transform(value: String): string {
    return 'kick.' + value;
  }
}
