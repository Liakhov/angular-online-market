import { Component, OnInit } from '@angular/core';
import {Order} from './../interface.ts'

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  orders = []

  allOrders = [
    {
      "number": 3,
      "status": "Завершен",
      "date": "02.01.2018",
      "name": "Макар Остапченко",
      "cost": 650
    },
    {
      "number": 4,
      "status": "Завершен",
      "date": "05.01.2018",
      "name": "Олег Андрушко",
      "cost": 1250
    },
    {
      "number": 5,
      "status": "Новый",
      "date": "12.01.2018",
      "name": "Ольга Иванова",
      "cost": 230
    }
  ]

  constructor() { }

  ngOnInit() {
    this.orders = this.allOrders
  }

  remove(order: Order){
    const idx = this.orders.findIndex( item => item.number === order.number )
    this.orders.splice(idx, 1)
  }
}