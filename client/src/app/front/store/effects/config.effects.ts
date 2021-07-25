import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {of} from 'rxjs';
import {catchError, exhaustMap, map} from 'rxjs/operators';

import {AppState} from '../../../store/app.state';
import {ConfigService} from '../../services';
import * as actions from '../actions/config.action';

@Injectable()
export class ConfigEffects {

  loadConfig$ = createEffect(() => this.actions$.pipe(
    ofType(actions.load),
    exhaustMap(() => {
      return this.configService.getConfig().pipe(
        map(data => {
          return actions.loadSuccess({config: data});
        }),
        catchError(() => {
          return of(actions.loadFail());
        })
      );
    })
  ));

  constructor(
    private store$: Store<AppState>,
    private actions$: Actions,
    private configService: ConfigService
  ) {
  }
}
