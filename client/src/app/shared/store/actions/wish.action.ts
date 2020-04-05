import {Action} from '@ngrx/store';

import {Position} from '../../interface';

export const ADD = '[WishList Add] Add';
export const REMOVE = '[WishList Remove] Remove';
export const CLEAR = '[WishList Clear] Clear';

export class Add implements Action {
  public readonly type = ADD;

  constructor(public payload: Position) {
  }
}

export class Remove implements Action {
  public readonly type = REMOVE;

  constructor(public payload: Position) {
  }
}

export class Clear implements Action {
  public readonly type = CLEAR;
}

export type Actions = | Add | Remove | Clear;
