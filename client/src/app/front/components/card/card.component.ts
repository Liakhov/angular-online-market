import {Component, Input} from '@angular/core';
import {Store} from '@ngrx/store';

import * as sharedServices from '../../../shared/services';
import * as services from '../../services';
import * as models from '../../../shared/interface';

import {AppState} from '../../../store/app.state';
import * as cartAction from '../../store/actions/cart.action';
import * as wishAction from '../../store/actions/wish.action';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() product: models.Product;

  constructor(
    private productService: services.ProductService,
    private storageService: sharedServices.StorageService,
    private store: Store<AppState>
  ) {
  }

  public async addToCart(product): Promise<void> {
    const item: models.Position = {
      _id: product._id,
      name: product.name,
      cost: product.cost,
      image: product.images[0] || '',
      quantity: 1
    };
    this.store.dispatch(new cartAction.Add(item));
  }

  public addToWishList(product): void {
    const img = product.images[0] || '';

    const orderPosition: models.Position = {
      _id: product._id,
      name: product.name,
      cost: product.cost,
      image: img,
      quantity: 1
    };

    this.store.dispatch(new wishAction.Add(orderPosition));
  }
}
