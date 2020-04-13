import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import * as services from '../../../shared/services';
import * as models from '../../../shared/interface';


@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit, OnDestroy {
  @ViewChild('sidenav', {static: true}) sidenavElem: ElementRef;
  public sidenav: models.MaterialInstance;
  public meta: models.Meta;
  public links = [
    {url: '/admin/review', name: 'Обзор'},
    {url: '/admin/order', name: 'Заказы'},
    {url: '/admin/category', name: 'Категории'},
    {url: '/admin/product', name: 'Товары'},
    {url: '/admin/mail', name: 'Подписки'},
    {url: '/admin/message', name: 'Сообщения'}
  ];

  constructor(private activeRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.sidenav = services.MaterialService.initSidenav(this.sidenavElem);

    this.activeRoute.data.subscribe(data => {
      this.meta = new models.Meta();
      this.meta.newOrders = data.admin.newOrder.length;
    });
  }

  ngOnDestroy(): void {
    if (this.sidenav) {
      this.sidenav.destroy();
    }
  }

  public openSidenav(event: Event): void {
    event.preventDefault();
    this.sidenav.open();
  }
}
