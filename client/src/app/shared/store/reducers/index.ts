import {ActionReducerMap, combineReducers, ActionReducer, createSelector} from '@ngrx/store';

import * as fromCart from './cart.reducer';
import * as fromWish from './wish.reducer';
import * as fromMeta from './meta.reducer';

export interface State {
  cart: fromCart.State;
  wish: fromWish.State;
  meta: fromMeta.State;
}

export const reducers: ActionReducerMap<State> = {
  cart: fromCart.reducer,
  wish: fromWish.reducer,
  meta: fromMeta.reducer
};

const mainReducer: ActionReducer<State> = combineReducers(reducers);

export function reducer(state: State, action: any): State {
  return mainReducer(state, action);
}

export const getCartState = state => state.cart;
export const getCart = createSelector(getCartState, fromCart.getCart);

export const getWishState = state => state.wish;
export const getWish = createSelector(getWishState, fromWish.getWish);

export const getMetaState = state => state.meta;
export const getMetaOrders = createSelector(getMetaState, fromMeta.getOrders);
