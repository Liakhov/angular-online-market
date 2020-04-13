import {Resolve} from '@angular/router';
import {Injectable} from '@angular/core';
import {catchError, mergeMap} from 'rxjs/operators';
import {EMPTY, of} from 'rxjs';

import * as services from './../../shared/services';

@Injectable()
export class AdminPanelResolver implements Resolve<any> {

  constructor(private metaServices: services.MetaServices) {
  }

  resolve(): any {

    return this.metaServices.fetch()
      .pipe(
        catchError(() => EMPTY),
        mergeMap(data => of(data))
      );
  }
}
