import { Component, OnInit } from '@angular/core';
import {Order} from './../../interface.ts'

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.css']
})
export class OrderItemComponent implements OnInit {

  order: Order = {
    "number": 3,
      "status": "Завершен",
      "date": "02.01.2018",
      "name": "Макар Остапченко",
      "cost": 650
  }

  constructor() { }

  ngOnInit() {
    
  }

}