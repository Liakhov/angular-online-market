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
      const candidate = state.wish.find(p => p._id === action.payload._id);
      if (!candidate) {
        state.wish.push(action.payload);
      }
      return state;
    }

    case actions.REMOVE: {
      const index = state.wish.indexOf(action.payload);
      state.wish.splice(index, 1);
      return state;
    }

    case actions.CLEAR: {
      state.wish.length = 0;
      return state;
    }

    default:
      return state;
  }
}

export const getWish = (state: State) => state.wish;
