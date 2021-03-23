import {Action} from '@ngrx/store';

import {Position} from '../../../shared/interface';


export const ADD = '[Cart] Add';
export const ADD_SUCCESS = '[Cart] Add Success';
export const REMOVE = '[Cart] Remove';
export const REMOVE_SUCCESS = '[Cart] Remove Success';
export const CLEAR = '[Cart] Clear';
export const CLEAR_SUCCESS = '[Cart] Clear Success';


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
  | Add
  | AddSuccess
  | Remove
  | RemoveSuccess
  | Clear
  | ClearSuccess;
