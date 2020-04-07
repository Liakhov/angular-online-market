import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {take} from 'rxjs/operators';

import {AppState} from '../../../shared/store/state/app.state';

import * as models from './../../../shared/interface';
import * as services from './../../../shared/services';
import * as reducers from '../../../shared/store/reducers';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit, AfterViewInit {
  @ViewChild('modal', {static: false}) modalElem: ElementRef;
  public cart$: Observable<models.Position[]>;
  public cart: models.Position[] = [];
  public modal: models.MaterialInstance;
  public form: FormGroup;

  constructor(private store: Store<AppState>, private OrderService: services.OrderService) {
    this.cart$ = this.store.pipe(select(reducers.getCart));
  }

  async ngOnInit(): Promise<void> {
    this.createForm();
    this.cart = await this.cart$.pipe(take(1)).toPromise();
  }

  ngAfterViewInit(): void {
    this.modal = services.MaterialService.initModal(this.modalElem);
  }


  public async onSubmit(): Promise<void> {
    const order: models.Order = {
      name: this.form.value.name,
      email: this.form.value.email,
      tel: this.form.value.telephone,
      list: this.cart
    };

    if (this.form.value.comment) {
      order.comment = this.form.value.comment;
    }

    try {
      await this.OrderService.create(order).pipe(take(1)).toPromise();
      this.modal.open();
    } catch (e) {
      services.MaterialService.toast(e.message);
    }
  }

  private createForm(): void {
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      telephone: new FormControl(null, [Validators.required, Validators.minLength(5)]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      comment: new FormControl(null)
    });
  }

}
