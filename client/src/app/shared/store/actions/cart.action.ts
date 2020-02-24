import { Action } from '@ngrx/store';

import { OrderPosition } from "../../interface";

export enum CartAction{
  Add = '[Cart Add] Add',
  Remove = '[Cart Remove] Remove',
  Clear = '[Cart Clear] Clear',
}

export class Add implements Action{
  public readonly type = CartAction.Add

  constructor(public payload: OrderPosition){}
}

export class Remove implements Action{

  public readonly type = CartAction.Remove

  constructor(public payload: OrderPosition){}
}

export class Clear implements Action{

  public readonly type = CartAction.Clear
}


export type CartActions = Add | Clear | Remove;
