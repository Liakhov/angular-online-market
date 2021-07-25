import {createAction, props} from '@ngrx/store';

import {Config} from '../../../shared/interface';

export const load = createAction('[Config] Load');

export const loadSuccess = createAction('[Config] Load Success', props<{ config: Config }>());

export const loadFail = createAction('[Config] Load Fail');
