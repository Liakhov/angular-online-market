import {createSelector} from '@ngrx/store';

import {State} from '../reducers/config.reducer';

export const selectConfigState = state => state.front.config;

export const selectLoading = createSelector(selectConfigState, (state: State) => state.loading);

export const selectLoaded = createSelector(selectConfigState, (state: State) => state.loaded);

export const selectConfig = createSelector(selectConfigState, (state: State) => state.config);

export const selectConfigRecommended = createSelector(selectConfigState, (state: State) => state.config.recommended);

export const selectConfigNewItems = createSelector(selectConfigState, (state: State) => state.config.newItems);

export const selectConfigCategories = createSelector(selectConfigState, (state: State) => state.config.categories);

