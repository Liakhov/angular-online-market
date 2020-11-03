import * as actions from '../actions/wish.action';
import {Position} from '../../interface';

export interface State {
  wish: Position[];
}

const initialState: State = {
  wish: []
};

export function reducer(state = initialState, action: actions.Actions): State {
  switch (action.type) {

    case actions.ADD: {
      const wish = [...state.wish];
      const candidate = wish.find(p => p._id === action.payload._id);
      if (!candidate) {
        wish.push(action.payload);
      }
      return {
        ...state,
        wish: [...wish]
      };
    }

    case actions.REMOVE: {
      const wish = [...state.wish];
      const index = state.wish.indexOf(action.payload);
      wish.splice(index, 1);
      return {
        ...state,
        wish: [...wish]
      };
    }

    case actions.CLEAR: {
      return {
        ...initialState
      };
    }

    default:
      return state;
  }
}

export const getWish = (state: State) => state.wish;
