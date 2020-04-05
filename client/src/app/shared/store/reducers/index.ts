import {ActionReducerMap, combineReducers, ActionReducer, createSelector} from '@ngrx/store';

import * as fromCart from './cart.reducer';
import * as fromWish from './wish.reducer';

export interface State {
  cart: fromCart.State;
  wish: fromWish.State;
}

export const reducers: ActionReducerMap<State> = {
  cart: fromCart.reducer,
  wish: fromWish.reducer
};

const mainReducer: ActionReducer<State> = combineReducers(reducers);

export function reducer(state: State, action: any): State {
  return mainReducer(state, action);
}

export const getCartState = state => state.cart;
export const getCart = createSelector(getCartState, fromCart.getCart);

export const getWishState = state => state.wish;
export const getWish = createSelector(getWishState, fromWish.getWish);
