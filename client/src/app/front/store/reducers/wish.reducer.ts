import * as actions from '../actions/wish.action';

const initialState = [];

export const reducer = (state = initialState, action: actions.Actions) => {
  switch (action.type) {

    case actions.INIT_SUCCESS: {
      return [
        ...action.payload
      ];
    }

    case actions.ADD_SUCCESS: {
      return [
        ...action.payload
      ];
    }

    case actions.REMOVE_SUCCESS: {
      return [
        ...action.payload
      ];
    }

    case actions.CLEAR: {
      return initialState;
    }

    default:
      return state;
  }
};

export const getWish = (state) => state;
