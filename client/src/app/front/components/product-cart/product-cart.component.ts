import { Component, Input } from '@angular/core';
import { Store } from "@ngrx/store";

import { Product } from "../../../shared/interface";
import { ProductService } from "../../../shared/services/product.service";

@Component({
  selector: 'app-product-cart',
  templateUrl: './product-cart.component.html',
  styleUrls: ['./product-cart.component.scss']
})
export class ProductCartComponent {

  @Input() product: Product
  // cart$: Observable<[]>

  constructor(
    private store: Store<{ cart: [] }>,
    private productService: ProductService
  ) {
    // this.cart$ = store.pipe(select('cart'))
  }

  addToCart(product){
    this.productService.addCart(product)
  }

  addToWishList(product){
    this.productService.addWishList(product)
  }
}
