import {ActionReducerMap} from '@ngrx/store';

import * as fromFrontReducer from './../front/store/reducers';
import * as fromAdminReducer from './../admin/store/reducers';

export interface AppState {
  front: fromFrontReducer.State;
  admin: fromAdminReducer.State;
}

export const reducers: ActionReducerMap<AppState> = {
  front: fromFrontReducer.reducer,
  admin: fromAdminReducer.reducer
};
