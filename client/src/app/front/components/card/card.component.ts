import {Component, Input} from '@angular/core';
import {Store} from '@ngrx/store';

import * as services from '../../../shared/services';
import * as models from '../../../shared/interface';

import {AppState} from '../../../store/app.state';
import * as cartAction from '../../store/actions/cart.action';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() product: models.Product;

  constructor(
    private productService: services.ProductService,
    private storageService: services.StorageService,
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
    this.productService.addWishList(product);
  }
}
