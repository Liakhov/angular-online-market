import {Component, OnInit} from '@angular/core';
import {take} from 'rxjs/operators';

import * as services from '../../../shared/services';
import * as models from '../../../shared/interface';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  public orders: models.Order[];

  constructor(private orderService: services.OrderService) {
  }

  ngOnInit(): void {
    this.fetch();
  }

  private async fetch(): Promise<void> {
    try {
      this.orders = await this.orderService.fetch().pipe(take(1)).toPromise();
    } catch (e) {
      services.MaterialService.toast(e.message);
    }
  }

  public calcSum(arr): number {
    return  arr.reduce((sum, item) => {
      return sum + (item.cost * item.quantity);
    }, 0);
  }
}
