import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { Remove, Clear } from 'src/app/shared/store/actions/cart.action';
import { Product } from "../../../shared/interface";

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
    this.calcSum()
  }

  remove(item): void {
    this.store.dispatch(new Remove(item))
    this.calcSum()
  }

  reset(): void {
    this.store.dispatch(new Clear())
    this.total = 0
  }

  calcSum(): void{
    this.total = this.cart.reduce((sum, item) => {
      return sum + (item.cost * item.quantity)
    }, 0)
  }
}
