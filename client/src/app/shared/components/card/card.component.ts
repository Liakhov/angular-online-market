import {Component, Input} from '@angular/core';

import * as services from '../../services';
import * as models from '../../interface';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() product: models.Product;

  constructor(private productService: services.ProductService) {
  }

  get thumbnail(): string {
    return this.product.images[0] ? this.product.images[0] : '/assets/img/nophoto.png';
  }

  public addToCart(product): void {
    this.productService.addCart(product);
  }

  public addToWishList(product): void {
    this.productService.addWishList(product);
  }
}
