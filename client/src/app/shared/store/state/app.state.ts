import {ActionReducerMap} from '@ngrx/store';

import * as fromCart from '../reducers/cart.reducer';
import * as fromWish from '../reducers/wish.reducer';
import * as fromMeta from '../reducers/meta.reducer';

export interface AppState {
  cart: fromCart.State;
  wish: fromWish.State;
  meta: fromMeta.State;
}

export const reducers: ActionReducerMap<AppState> = {
  cart: fromCart.reducer,
  wish: fromWish.reducer,
  meta: fromMeta.reducer
};
