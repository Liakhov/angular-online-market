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
      const cart = [...state.cart];
      const candidate = cart.find(p => p._id === action.payload._id);
      if (candidate) {
        candidate.quantity += action.payload.quantity;
      } else {
        cart.push(action.payload);
      }
      return {
        ...state,
        cart: [...cart]
      };
    }

    case CartAction.REMOVE: {
      const cart = [...state.cart];
      const index = cart.indexOf(action.payload);
      cart.splice(index, 1);
      return {
        ...state,
        cart: [...cart]
      };
    }

    case CartAction.CLEAR: {
      return {
        ...initialState
      };
    }

    default: {
      return state;
    }
  }
}

export const getCart = (state: State) => state.cart;
