export class CartProduct {
  _id: string;
  name: string;
  quantity: number;
  cost: number;
}

export interface AppState {
  cart: CartProduct[];
}

export const initialAppState: AppState = {
  cart: []
}

export function getInitialState(): AppState {
  return initialAppState;
}
