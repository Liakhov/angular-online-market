import {Action} from '@ngrx/store';

import {Position} from '../../../shared/interface';

export const INIT = '[WishList] Init';
export const INIT_SUCCESS = '[WishList] Init Success';
export const ADD = '[WishList] Add';
export const ADD_SUCCESS = '[WishList] Add Success';
export const REMOVE = '[WishList] Remove';
export const REMOVE_SUCCESS = '[WishList] Remove Success';
export const CLEAR = '[WishList] Clear';
export const CLEAR_SUCCESS = '[WishList] Clear Success';

export class Init implements Action {
  public readonly type = INIT;

}

export class InitSuccess implements Action {
  public readonly type = INIT_SUCCESS;

  constructor(public payload: Position[]) {
  }
}

export class Add implements Action {
  public readonly type = ADD;

  constructor(public payload: Position) {
  }
}

export class AddSuccess implements Action {
  public readonly type = ADD_SUCCESS;

  constructor(public payload: Position[]) {
  }
}

export class Remove implements Action {
  public readonly type = REMOVE;

  constructor(public payload: Position) {
  }
}

export class RemoveSuccess implements Action {
  public readonly type = REMOVE_SUCCESS;

  constructor(public payload: Position[]) {
  }
}

export class Clear implements Action {
  public readonly type = CLEAR;
}

export class ClearSuccess implements Action {
  public readonly type = CLEAR_SUCCESS;
}

export type Actions =
  | Init
  | InitSuccess
  | Add
  | AddSuccess
  | Remove
  | RemoveSuccess
  | Clear
  | ClearSuccess;
