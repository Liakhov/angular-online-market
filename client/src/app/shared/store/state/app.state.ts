import {ActionReducerMap} from '@ngrx/store';

import * as fromCart from '../reducers/cart.reducer';
import * as fromWish from '../reducers/wish.reducer';

export interface AppState {
  cart: fromCart.State;
  wish: fromWish.State;
}

export const reducers: ActionReducerMap<AppState> = {
  cart: fromCart.reducer,
  wish: fromWish.reducer,
};
