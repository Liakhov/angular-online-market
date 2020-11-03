import {Action} from '@ngrx/store';

import {Position} from '../../interface';

export enum CartAction {
  ADD = '[Cart Add] Add',
  REMOVE = '[Cart Remove] Remove',
  CLEAR = '[Cart Clear] Clear',
}

export class Add implements Action {
  public readonly type = CartAction.ADD;

  constructor(public payload: Position) {
  }
}

export class Remove implements Action {
  public readonly type = CartAction.REMOVE;

  constructor(public payload: Position) {
  }
}

export class Clear implements Action {
  public readonly type = CartAction.CLEAR;
}

export type Actions = Add | Clear | Remove;
