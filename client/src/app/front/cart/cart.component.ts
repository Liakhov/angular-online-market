import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {Store, select} from '@ngrx/store';
import {Remove, Clear} from 'src/app/shared/store/actions/cart.action';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cart$: Observable<[]>

  constructor(private store: Store<{ cart: [] }>) {
    this.cart$ = store.pipe(select('cart'));
  }


  remove(item) {
    this.store.dispatch(Remove(item));
  }

  reset() {
    this.store.dispatch(Clear());
  }

  ngOnInit(): void {
    console.log(this.cart$)
  }

}
