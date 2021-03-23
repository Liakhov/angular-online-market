import {ActionReducer, ActionReducerMap, combineReducers, createSelector} from '@ngrx/store';
import * as fromMeta from './orders.reducer';

export interface State {
  orders: any[];
}

export const reducers: ActionReducerMap<State> = {
  orders: fromMeta.reducer
};

const mainReducer: ActionReducer<State> = combineReducers(reducers);

export function reducer(state: State, action: any): State {
  return mainReducer(state, action);
}


export const getOrdersState = state => state.admin.orders;
export const getOrders = createSelector(getOrdersState, fromMeta.getOrders);
