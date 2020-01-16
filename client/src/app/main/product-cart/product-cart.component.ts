import {Component, Input, OnInit} from '@angular/core';
import {Product} from "../../shared/interface";
import {Add} from "../../shared/store/actions/cart.action";
import {Store, select} from "@ngrx/store";
import {Observable} from "rxjs";

@Component({
  selector: 'app-product-cart',
  templateUrl: './product-cart.component.html',
  styleUrls: ['./product-cart.component.scss']
})
export class ProductCartComponent implements OnInit {

  @Input() product: Product
  cart$: Observable<[]>

  constructor(private store: Store<{ cart: [] }>) {
    this.cart$ = store.pipe(select('cart'))
  }

  ngOnInit() {

  }

  addCart(product: Product){
    this.store.dispatch(Add(product))
  }

  addWishList(product: Product){
    console.log(`Product add to wish list: ${product}`)
  }
}
