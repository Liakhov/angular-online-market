import {Action} from '@ngrx/store';

export enum MetaAction {
  ADD = '[Order Add] Add',
  REMOVE = '[Order Remove] Remove'
}

export class Add implements Action {
  public readonly type = MetaAction.ADD;

  constructor(public payload: string[]) {
  }
}

export class Remove implements Action {

  public readonly type = MetaAction.REMOVE;

  constructor(public payload: string) {
  }
}

export type Actions = Add | Remove;
