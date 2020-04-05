import {CartAction} from '../actions/cart.action';

import * as actions from '../actions/cart.action';
import {Position} from '../../interface';

export interface State {
  cart: Position[];
}

const initialState: State = {
  cart: []
};

export function reducer(state = initialState, action: actions.Actions): State {
  switch (action.type) {

    case CartAction.ADD: {
      const candidate = state.cart.find(p => p._id === action.payload._id);
      if (candidate) {
        candidate.quantity += action.payload.quantity;
      } else {
        state.cart.push(action.payload);
      }
      return state;
    }

    case CartAction.REMOVE: {
      const index = state.cart.indexOf(action.payload);
      state.cart.splice(index, 1);
      return state;
    }

    case CartAction.CLEAR: {
      state.cart.length = 0;
      return state;
    }

    default: {
      return state;
    }
  }
}

export const getCart = (state: State) => state.cart;
