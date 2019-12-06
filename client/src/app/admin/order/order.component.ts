import {Component, OnDestroy, OnInit} from '@angular/core';
import {Order} from '../../shared/interface';
import {OrderService} from "../../shared/services/order.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit, OnDestroy {
  orders = []
  oSub: Subscription

  constructor(private orderService: OrderService) { }

  ngOnInit() {
    this.oSub = this.orderService.fetch().subscribe(data =>  {
      this.orders = data
    })

  }

  ngOnDestroy(): void {
    if(this.oSub) {
      this.oSub.unsubscribe()
    }
  }


  remove(order: Order){
    const idx = this.orders.findIndex( item => item.number === order.number )
    this.orders.splice(idx, 1)
  }
}
