import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Store} from '@ngrx/store';

import * as models from '../../../shared/interface';

import {AppState} from '../../../store/app.state';
import * as actions from '../../store/actions/cart.action';

@Component({
  selector: 'app-product-container',
  templateUrl: './product-container.component.html',
  styleUrls: ['./product-container.component.scss']
})
export class ProductContainerComponent {
  public product$: Observable<models.Product>;

  constructor(
    private activeRoute: ActivatedRoute,
    private store: Store<AppState>
  ) {
    this.product$ = this.activeRoute.data.pipe(map(data => data.product));
  }

  public addToCart(product): void {
    const item: models.Position = {
      _id: product._id,
      name: product.name,
      cost: product.cost,
      image: product.images[0] || '',
      quantity: 1
    };
    this.store.dispatch(new actions.Add(item));
  }
}
