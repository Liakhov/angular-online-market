import {configMock} from '../../services/config.service.mock';
import {State} from '../reducers/config.reducer';
import {
  selectConfig,
  selectConfigCategories,
  selectConfigNewItems,
  selectConfigRecommended,
  selectLoaded,
  selectLoading
} from './config.selectors';

describe('ConfigSelectors', () => {

  const initialState: State = {
    loading: false,
    loaded: false,
    config: configMock
  };

  it('should select loading', () => {
    const result = selectLoading.projector(initialState);
    expect(result).toBeFalsy();
  });

  it('should select loaded', () => {
    const result = selectLoaded.projector(initialState);
    expect(result).toBeFalsy();
  });

  it('should select config', () => {
    const result = selectConfig.projector(initialState);
    expect(result).toEqual(configMock);
  });

  it('should select configRecommended', () => {
    const result = selectConfigRecommended.projector(initialState);

    expect(result.length).toEqual(1);
    expect(result[0]).toEqual(configMock.recommended[0]);
  });

  it('should select configNewItems', () => {
    const result = selectConfigNewItems.projector(initialState);

    expect(result.length).toEqual(1);
    expect(result[0]).toEqual(configMock.newItems[0]);
  });

  it('should select configCategories', () => {
    const result = selectConfigCategories.projector(initialState);

    expect(result.length).toEqual(1);
    expect(result[0]).toEqual(configMock.categories[0]);
  });
});
