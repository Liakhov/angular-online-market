import {ActionModel} from '../models/action.model'
import {ActionTypes} from '../actions/cart.action'

export const products = []

export function cartReducer(state = products, action: ActionModel) {
  switch (action.type) {

    case ActionTypes.Add:
    {
      state.push(action.payload)
      console.log(state)
      return state
    }

    case ActionTypes.Remove:
    {
        const index = state.indexOf(action.payload)
        state.splice(index, 1)
        console.log(state)
        return state
    }

    case ActionTypes.Clear:
    {
      state = []
      console.log(state)
      return state
    }

    default:
      return state
  }
}
