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
      for (const order of action.payload) {
        const candidate = state.orders.indexOf(order);
        if (candidate === -1) {
          state.orders.push(order);
        }
      }
      return state;
    }

    case MetaAction.REMOVE: {
      const index = state.orders.indexOf(action.payload);
      if (index !== -1) {
        state.orders.splice(index, 1);
      }
      return state;
    }

    default: {
      return state;
    }
  }
}

export const getOrders = (state: State) => state.orders;
