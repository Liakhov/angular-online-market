import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {take} from 'rxjs/operators';

import {AppState} from '../../../shared/store/state/app.state';

import * as models from './../../../shared/interface';
import * as actions from './../../../shared/store/actions/cart.action';
import * as services from './../../../shared/services';
import * as reducers from '../../../shared/store/reducers';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements AfterViewInit {
  @ViewChild('modal') modalElem: ElementRef;
  private cart$: Observable<models.Position[]>;
  public modal: models.MaterialInstance;
  public form: FormGroup;
  public sum: number;

  constructor(private store: Store<AppState>, private orderService: services.OrderService) {
    this.cart$ = this.store.pipe(select(reducers.getCart));
    this.createForm();
    this.calcSum();
  }

  ngAfterViewInit(): void {
    this.modal = services.MaterialService.initModal(this.modalElem);
  }


  public async onSubmit(): Promise<void> {
    const cart = await this.cart$.pipe(take(1)).toPromise();
    const order: models.Order = {
      name: this.form.value.name,
      email: this.form.value.email,
      tel: this.form.value.telephone,
      list: cart,
      address: this.form.value.address
    };

    if (this.form.value.comment) {
      order.comment = this.form.value.comment;
    }

    try {
      await this.orderService.create(order).pipe(take(1)).toPromise();
      this.modal.open();
      this.store.dispatch(new actions.Clear());
    } catch (e) {
      services.MaterialService.toast(e.message);
    }
  }

  private createForm(): void {
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      telephone: new FormControl(null, [Validators.required, Validators.minLength(5)]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      comment: new FormControl(null),
      address: new FormControl(null)
    });
  }

  private async calcSum(): Promise<void> {
    const cart = await this.cart$.pipe(take(1)).toPromise();
    this.sum = cart.reduce((sum, item) => {
      return sum + (item.cost * item.quantity);
    }, 0);
  }
}
