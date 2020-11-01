import {Component, OnInit} from '@angular/core';
import {Store, select} from '@ngrx/store';
import {Observable} from 'rxjs';
import {take} from 'rxjs/operators';

import * as cartActions from '../../../shared/store/actions/cart.action';
import * as models from '../../../shared/interface';
import * as reducers from '../../../shared/store/reducers';

import {AppState} from '../../../shared/store/state/app.state';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  public cart$: Observable<models.Position[]>;
  public cart: models.Position[] = [];
  public total: number;

  constructor(private store: Store<AppState>) {
    this.cart$ = this.store.pipe(select(reducers.getCart));
  }

  async ngOnInit(): Promise<void> {
    await this.calcSum();
  }

  public remove(item): void {
    this.store.dispatch(new cartActions.Remove(item));
    this.calcSum();
  }

  public reset(): void {
    this.store.dispatch(new cartActions.Clear());
    this.total = 0;
  }

  private async calcSum(): Promise<void> {
    const cart = await this.cart$.pipe(take(1)).toPromise();
    this.total = cart.reduce((sum, item) => {
      return sum + (item.cost * item.quantity);
    }, 0);
  }
}
