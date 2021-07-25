import {Injectable} from '@angular/core';
import {Resolve} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {filter, first, tap} from 'rxjs/operators';

import * as actions from '../store/actions/config.action';

import {State} from '../store/reducers/config.reducer';
import {selectLoaded} from '../store/selectors/config.selectors';

@Injectable()
export class ConfigResolver implements Resolve<boolean> {

  constructor(private store$: Store<State>) {
  }

  resolve(): Observable<boolean> {
    return this.store$.pipe(
      select(selectLoaded),
      tap(loaded => {
        if (!loaded) {
          this.store$.dispatch(actions.load());
        }
      }),
      filter(loaded => loaded),
      first()
    );
  }
}
