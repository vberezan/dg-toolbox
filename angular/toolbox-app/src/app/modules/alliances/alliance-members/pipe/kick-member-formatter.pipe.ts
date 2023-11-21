import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'kickMemberFormatter'
})
export class KickMemberFormatterPipe implements PipeTransform {

  transform(dgId: String): string {
    return 'kick.' + dgId;
  }
}
