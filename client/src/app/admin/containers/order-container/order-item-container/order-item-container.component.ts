import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import {take} from 'rxjs/operators';

import {AppState} from '../../../../store/app.state';

import * as services from '../../../../shared/services';
import * as models from '../../../../shared/interface';
import * as constants from '../../../../shared/constants';
import * as actions from '../../../store/actions/orders.action';


@Component({
  selector: 'app-order-item-container',
  templateUrl: './order-item-container.component.html',
  styleUrls: ['./order-item-container.component.scss']
})
export class OrderItemContainerComponent implements OnInit, AfterViewInit {
  @ViewChild('selectStatus') selectStatus: ElementRef;
  private id: string;
  public select: models.MaterialInstance;
  public order: models.Order;
  public orderStatuses = constants.ORDER_STATUS;
  public form: FormGroup;

  constructor(
    private route: ActivatedRoute,
    public routing: Router,
    private orderService: services.OrderService,
    private store: Store<AppState>) {
  }

  async ngOnInit(): Promise<void> {
    this.id = this.route.snapshot.paramMap.get('id');
    await this.fetch();
    this.createForm();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.select = services.MaterialService.initSelect(this.selectStatus);
    }, 500);
  }

  private async fetch(): Promise<void> {
    this.order = await this.orderService.getById(this.id).pipe(take(1)).toPromise();
  }

  public async remove(): Promise<void> {
    try {
      const data = await this.orderService.remove(this.id).pipe(take(1)).toPromise();
      this.store.dispatch(new actions.Remove(this.id));
      services.MaterialService.toast(data.message);
      this.routing.navigateByUrl('/admin/order');
    } catch (e) {
      services.MaterialService.toast(e.message);
    }
  }

  public async onSubmit(): Promise<void> {
    const order: models.Order = {
      name: this.order.name,
      tel: this.order.tel,
      email: this.order.email,
      status: this.form.value.status,
      list: this.order.list
    };
    try {
      const data = await this.orderService.update(this.order._id, order).pipe(take(1)).toPromise();
      this.orderToStore();
      services.MaterialService.toast(data.message);
    } catch (e) {
      services.MaterialService.toast(e.message);
    }

  }

  public calcSum(arr): number {
    return arr.reduce((sum, item) => {
      return sum + (item.cost * item.quantity);
    }, 0);
  }

  private createForm(): void {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      description: new FormControl(null),
      status: new FormControl(this.order.status)
    });
  }

  private orderToStore(): void {
    const status = this.form.value.status;
    if (status === 'new') {
      const orders = [];
      orders.push(this.id);
      this.store.dispatch(new actions.Init(orders));
    }

    if (status === 'processing' || status === 'completed') {
      this.store.dispatch(new actions.Remove(this.id));
    }
  }
}
