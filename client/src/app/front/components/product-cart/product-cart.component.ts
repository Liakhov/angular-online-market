import { Component, Input } from '@angular/core';

import { ProductService } from "../../../shared/services/product.service";
import { Product } from "../../../shared/interface";

@Component({
  selector: 'app-product-cart',
  templateUrl: './product-cart.component.html',
  styleUrls: ['./product-cart.component.scss']
})
export class ProductCartComponent {
  @Input() product: Product

  constructor(private productService: ProductService) { }

  get thumbnail(): string{
    return this.product.images[0] ? this.product.images[0] : '/assets/img/nophoto.png';
  }

  addToCart(product){
    this.productService.addCart(product)
  }

  addToWishList(product){
    this.productService.addWishList(product)
  }
}
