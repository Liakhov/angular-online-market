import * as actions from '../actions/config.action';
import {initialState, reducer, State} from './config.reducer';

describe('ConfigReducer', () => {
  let state: State;

  const config = {
    categories: [],
    newItems: [],
    recommended: []
  };

  beforeEach(() => {
    state = initialState;
  });

  it('load: should set loading true and loaded false', () => {
    const action = actions.load();
    const result = reducer(state, action);

    expect(result.loading).toBeTruthy();
    expect(result.loaded).toBeFalsy();
  });

  it('loadSuccess: should set loading false and loaded true and set config data', () => {
    const action = actions.loadSuccess({config});
    const result = reducer(state, action);

    expect(result.loading).toBeFalsy();
    expect(result.loaded).toBeTruthy();
    expect(result.config).toEqual(config);
  });


  it('loadFail: should set loading and loaded false', () => {
    const action = actions.loadFail();
    const result = reducer(state, action);

    expect(result.loading).toBeFalsy();
    expect(result.loaded).toBeFalsy();
  });
});
