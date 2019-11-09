import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  links = [
    {url: '/admin/review', name: 'Обзор'},
    {url: '/admin/order', name: 'Заказы'},
    {url: '/admin/user', name: 'Покупатели'},
    {url: '/admin/category', name: 'Категории'},
    {url: '/admin/product', name: 'Товары'}
  ]

  constructor() { }

  ngOnInit() {
  }

}