import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {switchMap, map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';

import {StorageService} from '../../../shared/services';

import {AppState} from '../../../store/app.state';
import * as actions from '../actions/cart.action';

@Injectable()
export class CartEffects {

  @Effect()
  initCart$ = this.actions$.pipe(
    ofType<actions.Init>(actions.INIT),
    switchMap(() => {
      return this.storageService.get('cart').pipe(
        map(storage => {
          const cart = storage || [];
          return new actions.InitSuccess(cart);
        })
      );
    })
  );

  @Effect()
  addCart$ = this.actions$.pipe(
    ofType<actions.Add>(actions.ADD),
    switchMap(({payload}) => {
      return this.storageService.get('cart').pipe(
        switchMap((storageCart) => {
          const cart = storageCart || [];
          if (cart.length) {
            const item = cart.find(p => p._id === payload._id);
            item ? (item.quantity += payload.quantity) : cart.push(payload);
          } else {
            cart.push(payload);
          }
          return this.storageService.set('cart', cart)
            .pipe(
              map(() => {
                return new actions.AddSuccess(cart);
              })
            );
        })
      );
    })
  );

  @Effect()
  removeCart$ = this.actions$.pipe(
    ofType<actions.Remove>(actions.REMOVE),
    switchMap(({payload}) => {
      return this.storageService.get('cart').pipe(
        switchMap((storageCart) => {
          const index = storageCart.indexOf(payload);
          storageCart.splice(index, 1);
          return this.storageService.set('cart', storageCart)
            .pipe(
              map(() => {
                return new actions.RemoveSuccess(storageCart);
              })
            );
        })
      );
    })
  );

  @Effect({dispatch: false})
  clearCart$: Observable<any> = this.actions$.pipe(
    ofType<actions.Clear>(actions.CLEAR),
    switchMap(() => {
      return this.storageService.remove('cart')
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
