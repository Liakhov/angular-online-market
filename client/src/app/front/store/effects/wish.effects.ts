import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {switchMap, map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';

import {StorageService} from '../../../shared/services';

import {AppState} from '../../../store/app.state';
import * as actions from '../actions/wish.action';

@Injectable()
export class WishEffects {

  @Effect()
  addWish$ = this.actions$.pipe(
    ofType<actions.Add>(actions.ADD),
    switchMap(({payload}) => {
      return this.storageService.get('wish').pipe(
        switchMap((storageWish) => {
          const wish = storageWish || [];
          const candidate = wish.find(p => p._id === payload._id);
          if (!candidate) {
            wish.push(payload);
          }
          return this.storageService.set('wish', wish)
            .pipe(
              map(() => {
                return new actions.AddSuccess(wish);
              })
            );
        })
      );
    })
  );

  @Effect()
  removeWish$ = this.actions$.pipe(
    ofType<actions.Remove>(actions.REMOVE),
    switchMap(({payload}) => {
      return this.storageService.get('wish').pipe(
        switchMap((storageWish) => {
          const index = storageWish.indexOf(payload);
          storageWish.splice(index, 1);
          return this.storageService.set('wish', storageWish)
            .pipe(
              map(() => {
                return new actions.RemoveSuccess(storageWish);
              })
            );
        })
      );
    })
  );

  @Effect({dispatch: false})
  clearWish$: Observable<any> = this.actions$.pipe(
    ofType<actions.Clear>(actions.CLEAR),
    switchMap(() => {
      return this.storageService.remove('wish')
        .pipe(
          map(() => {
            return new actions.ClearSuccess();
          })
        );
    })
  );

  constructor(
    private store$: Store<AppState>,
    private actions$: Actions,
    private storageService: StorageService
  ) {
  }
}
