import { Component, OnInit } from '@angular/core';
import {Store, select} from '@ngrx/store';
import {Remove, Clear} from 'src/app/shared/store/actions/cart.action';
import {Product} from "../../shared/interface";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cart: Product[] = []
  total: number

  constructor(private store: Store<{ cart: [] }>) {
     store.pipe(select('cart')).subscribe(data => {
         this.cart = data;
     })

  }

  ngOnInit(): void {
    this.calcSum(this.cart)
  }

  remove(item) {
    this.store.dispatch(Remove(item))
    this.calcSum(this.cart)
  }

  reset() {
    this.store.dispatch(Clear())
    this.total = 0
  }

  calcSum(cart){
    this.total = cart.reduce((sum, item) => {
      return sum + item.cost
    }, 0)
  }

}
