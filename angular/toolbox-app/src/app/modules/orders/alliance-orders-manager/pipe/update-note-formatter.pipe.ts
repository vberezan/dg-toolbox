import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'updateNoteFormatter'
})
export class UpdateNoteFormatterPipe implements PipeTransform {

  transform(dgId: String): string {
    return '/alliances/note/' + dgId + '/';
  }

}
