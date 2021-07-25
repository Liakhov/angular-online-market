import {Observable} from 'rxjs';
import {of} from 'rxjs/internal/observable/of';

import {Category, Config, Product} from '../../shared/interface';

export function ConfigServiceMock(): Observable<Config> {
  return of(configMock);
}

const product: Product = {
  active: true,
  recommend: true,
  name: 'Product',
  cost: 1200,
  quantity: 12
};

const product1: Product = {
  active: true,
  recommend: true,
  name: 'Product 1',
  cost: 1500,
  quantity: 16
};

const category: Category = {
  name: 'Category',
  image: '/src/image',
  description: 'Category description',
  quantity: 12
};

export const configMock: Config = {
  categories: [category],
  newItems: [product],
  recommended: [product1]
};
