import {Action, createReducer, on} from '@ngrx/store';

import {Config} from '../../../shared/interface';
import * as actions from '../actions/config.action';

export interface State {
  loaded: boolean;
  loading: boolean;
  config: Config;
}

export const initialState: State = {
  loaded: false,
  loading: false,
  config: null
};

const configReducer = createReducer(
  initialState,

  on(actions.load, state => ({
    ...state,
    loading: true,
    loaded: false
  })),

  on(actions.loadSuccess, (state, {config}) => ({
    ...state,
    loading: false,
    loaded: true,
    config
  })),

  on(actions.loadFail, state => ({
    ...state,
    loading: false,
    loaded: false
  }))
);

export function reducer(state: State, action: Action) {
  return configReducer(state, action);
}
