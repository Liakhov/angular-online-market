import {Component, OnInit} from '@angular/core';
import {take} from 'rxjs/operators';

import * as services from '../../../shared/services';
import * as models from '../../../shared/interface';
import * as constants from './../../../shared/constants';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  public orders: models.Order[];
  public status = constants.ORDER_STATUS;

  constructor(private orderService: services.OrderService) {
  }

  async ngOnInit(): Promise<void> {
    await this.fetch();
  }

  private async fetch(): Promise<void> {
    try {
      this.orders = await this.orderService.fetch().pipe(take(1)).toPromise();
    } catch (e) {
      services.MaterialService.toast(e.message);
    }
  }

  public statusText(statusItem: string): string {
    const item = this.status.find(v => v.value === statusItem);
    return item ? item.caption : '';
  }

  public calcSum(arr): number {
    return arr.reduce((sum, item) => {
      return sum + (item.cost * item.quantity);
    }, 0);
  }
}
