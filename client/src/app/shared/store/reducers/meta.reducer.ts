import {MetaAction} from '../actions/meta.action';
import * as actions from '../actions/meta.action';

export interface State {
  orders: string[];
}

const initialState: State = {
  orders: []
};

export function reducer(state = initialState, action: actions.Actions): State {
  switch (action.type) {

    case MetaAction.ADD: {
      return {
        ...state,
        orders: [...state.orders, ...action.payload]
      };
    }

    case MetaAction.REMOVE: {
      const orders = [...state.orders];
      const index = orders.indexOf(action.payload);
      if (index !== -1) {
        orders.splice(index, 1);
      }
      return {
        ...state,
        orders: [...orders]
      };
    }

    case MetaAction.CLEAR:
      return {
        ...initialState
      };

    default: {
      return state;
    }
  }
}

export const getOrders = (state: State) => state.orders;
