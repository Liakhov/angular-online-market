import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {take} from 'rxjs/operators';

import * as services from '../../../../shared/services';
import * as models from '../../../../shared/interface';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.css']
})
export class OrderItemComponent implements OnInit {
  private id: string;
  public order: models.Order;

  constructor(private route: ActivatedRoute, public routing: Router, private orderService: services.OrderService) {
  }

  async ngOnInit(): Promise<void> {
    this.id = this.route.snapshot.paramMap.get('id');
    this.fetch();
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

  public save(): void {
    console.log('Save order');
  }

  public calcSum(arr): number {
    return arr.reduce((sum, item) => {
      return sum + (item.cost * item.quantity);
    }, 0);
  }
}
