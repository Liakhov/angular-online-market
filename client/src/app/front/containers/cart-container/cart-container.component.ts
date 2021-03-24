import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {filter, take} from 'rxjs/operators';
import {FormArray, FormControl, Validators} from '@angular/forms';
import {select, Store} from '@ngrx/store';

import * as cartActions from '../../store/actions/cart.action';
import * as models from '../../../shared/interface';
import * as reducers from '../../store/reducers';

@Component({
  selector: 'app-cart-container',
  templateUrl: './cart-container.component.html',
  styleUrls: ['./cart-container.component.scss']
})
export class CartContainerComponent implements OnInit, OnDestroy {
  public form: FormArray;
  public cart$: Observable<models.Position[]>;
  public cart: models.Position[] = [];
  public total: number;
  private cartSub: Subscription;
  private calcSumSub: Subscription;
  private formChangesSub: Subscription;

  constructor(private store: Store<reducers.State>) {
    this.cart$ = this.store.pipe(select(reducers.getCart));
  }

  async ngOnInit(): Promise<void> {
    await this.createForm();
    await this.calcSum();
    this.getCart();
    this.checkFormChanges();
  }

  ngOnDestroy(): void {
    if (this.cartSub) {
      this.cartSub.unsubscribe();
    }
    if (this.calcSumSub) {
      this.calcSumSub.unsubscribe();
    }
    if (this.formChangesSub) {
      this.formChangesSub.unsubscribe();
    }
  }

  private getCart(): void {
    this.cartSub = this.cart$.subscribe(data => {
      this.cart = data;
    });
  }

  public remove(index: number): void {
    this.store.dispatch(new cartActions.Remove(this.cart[index]));
    this.form.removeAt(index);
  }

  public reset(): void {
    this.store.dispatch(new cartActions.Clear());
    this.form.clear();
  }

  private async calcSum(): Promise<void> {
    this.calcSumSub = this.cart$
      .subscribe(cart => {
        this.total = cart.reduce((sum, item) => {
          return sum + (item.cost * item.quantity);
        }, 0);
      });
  }

  private async createForm(): Promise<void> {
    this.form = new FormArray([]);
    this.cart$
      .pipe(
        filter((data: Array<models.Position>) => !!data.length),
        take(1)
      )
      .subscribe((data: Array<models.Position>) => {
        data.forEach(item => {
          this.form.push(new FormControl(item.quantity, Validators.min(0)));
        });
      });
  }

  private checkFormChanges(): void {
    this.formChangesSub = this.form.valueChanges.subscribe((data: Array<number>) => {
      if (data.length !== this.cart.length) {
        return;
      }
      this.cart.forEach((cartItem, index) => {
        if (data[index] !== cartItem.quantity) {
          const position = this.cart[index];
          position.quantity = data[index] - position.quantity;
          this.store.dispatch(new cartActions.Add(position));
        }
      });
    });
  }
}
