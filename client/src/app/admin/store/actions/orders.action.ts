import {Action} from '@ngrx/store';

export enum OrdersAction {
  INIT = '[Order] Init',
  REMOVE = '[Order] Remove',
  CLEAR = '[Order] Clear'
}

export class Init implements Action {
  public readonly type = OrdersAction.INIT;

  constructor(public payload: string[]) {
  }
}

export class Remove implements Action {
  public readonly type = OrdersAction.REMOVE;

  constructor(public payload: string) {
  }
}

export class Clear implements Action {
  public readonly type = OrdersAction.CLEAR;

}

export type Actions =
  | Init
  | Remove
  | Clear;
