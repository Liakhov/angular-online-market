import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';
import {provideMockActions} from '@ngrx/effects/testing';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {Observable, of} from 'rxjs';
import {throwError} from 'rxjs/internal/observable/throwError';

import {ConfigService} from '../../services';
import {configMock} from '../../services/config.service.mock';

import {load} from '../actions/config.action';
import {initialState, State} from '../reducers/config.reducer';
import {ConfigEffects} from './config.effects';

describe('ConfigEffects', () => {
  let effects: ConfigEffects;
  let actions$: Observable<any>;
  let store: MockStore<State>;
  let configService: ConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ConfigEffects,
        ConfigService,
        provideMockActions(() => actions$),
        provideMockStore({initialState}),
      ]
    });

    configService = TestBed.inject(ConfigService);
    effects = TestBed.inject(ConfigEffects);
    store = TestBed.inject(MockStore);
    store.setState(initialState);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  it('should be call loadSuccess', () => {
    actions$ = of(load);

    spyOn(configService, 'getConfig').and.returnValue(of(configMock));

    effects.loadConfig$.subscribe(action => {
      expect(action).toEqual({
        type: '[Config] Load Success',
        config: configMock
      });
    });
  });

  it('should be call loadFail', () => {
    actions$ = of(load);

    spyOn(configService, 'getConfig').and.returnValue(throwError('This is an error!'));

    effects.loadConfig$.subscribe(action => {
      expect(action).toEqual({
        type: '[Config] Load Fail'
      });
    });
  });
});
