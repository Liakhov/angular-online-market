import * as actions from '../actions/cart.action';
import {Position} from '../../../shared/interface';

const initialState = [];

export const reducer = (state = initialState, action: actions.Actions) => {
  switch (action.type) {

    case actions.ADD_SUCCESS: {
      return [
        ...action.payload
      ];
    }

    case actions.REMOVE_SUCCESS:
      return [
        ...action.payload
      ];

    case actions.CLEAR:
      return initialState;

    default:
      return state;
  }
};

export const getCart = (state: Position[]) => state;
