import { Action } from "@ngrx/store";

import { initialAppState } from '../state/app.state';
import { CartAction } from '../actions/cart.action';


export class ActionModel implements Action {
  type: string;
  payload: any;
}

export function cartReducer(
  state = initialAppState.cart,
  action: ActionModel
) {
  switch (action.type) {

    case CartAction.Add:
    {
      const candidate = state.find( p => p._id === action.payload._id)
      if(candidate){
        candidate.quantity += action.payload.quantity
      }else{
        state.push(action.payload)
      }
      return state
    }

    case CartAction.Remove:
    {
        const index = state.indexOf(action.payload)
        state.splice(index, 1)
        return state
    }

    case CartAction.Clear:
    {
      state.length = 0;
      return state
    }

    default:
      return state
  }
}
