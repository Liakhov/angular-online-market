import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {take} from 'rxjs/operators';

import * as services from '../../../../shared/services';
import * as models from '../../../../shared/interface';
import * as constants from './../../../../shared/constants';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.scss']
})
export class OrderItemComponent implements OnInit, AfterViewInit {
  @ViewChild('selectStatus', {static: false}) selectStatus: ElementRef;
  private id: string;
  public select: models.MaterialInstance;
  public order: models.Order;
  public orderStatuses = constants.ORDER_STATUS;
  public form: FormGroup;

  constructor(private route: ActivatedRoute, public routing: Router, private orderService: services.OrderService) {
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
      services.MaterialService.toast(data.message);
      this.routing.navigateByUrl('/admin/order');
    } catch (e) {
      services.MaterialService.toast(e.message);
    }
  }

  public async onSubmit(): Promise<void> {
    const order = {
      name: this.order.name,
      tel: this.order.tel,
      email: this.order.email,
      status: this.form.value.status,
      list: this.order.list
    };
    try {
      const data = await this.orderService.update(this.order._id, order).pipe(take(1)).toPromise();

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
}
