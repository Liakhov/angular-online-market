import {Component, Input} from '@angular/core';

import * as services from '../../../shared/services';
import * as models from '../../../shared/interface';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() product: models.Product;

  constructor(private productService: services.ProductService) {
  }

  public addToCart(product): void {
    this.productService.addCart(product);
  }

  public addToWishList(product): void {
    this.productService.addWishList(product);
  }
}
