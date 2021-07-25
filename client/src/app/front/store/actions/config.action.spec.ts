import * as actions from './config.action';

const config = {
  categories: [],
  newItems: [],
  recommended: []
};

describe('ConfigAction', () => {
  it('should create load action', () => {
    const action = actions.load();

    expect({...action}).toEqual({type: '[Config] Load'});
  });

  it('should create loadSuccess action', () => {
    const action = actions.loadSuccess({config});

    expect({...action}).toEqual({type: '[Config] Load Success', config});
  });

  it('should create loadFail action', () => {
    const action = actions.loadFail();

    expect({...action}).toEqual({type: '[Config] Load Fail'});
  });
});
