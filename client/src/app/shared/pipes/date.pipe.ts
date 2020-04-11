import {Pipe, PipeTransform} from '@angular/core';

import * as moment from 'moment';

@Pipe({
  name: 'formDate'
})

export class DatePipe implements PipeTransform {

  transform(item: Date): string {
    return moment(item).format('DD.MM.YYYY, h:mm a');
  }
}
