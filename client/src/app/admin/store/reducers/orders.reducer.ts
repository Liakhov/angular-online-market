import {OrdersAction} from '../actions/orders.action';
import * as actions from '../actions/orders.action';

const initialState = [];

export const reducer = (state = initialState, action: actions.Actions) => {
  switch (action.type) {

    case OrdersAction.INIT: {
      return [...state, ...action.payload];
    }

    case OrdersAction.REMOVE: {
      const orders = [...state];
      const index = orders.indexOf(action.payload);
      if (index !== -1) {
        orders.splice(index, 1);
      }
      return [...orders];
    }

    case OrdersAction.CLEAR:
      return initialState;

    default:
      return state;
  }
};

export const getOrders = (state) => state;
