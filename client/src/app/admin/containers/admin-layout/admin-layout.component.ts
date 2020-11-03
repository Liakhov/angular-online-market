import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';

import {AppState} from '../../../shared/store/state/app.state';

import * as services from '../../../shared/services';
import * as models from '../../../shared/interface';
import * as reducers from '../../../shared/store/reducers';
import * as metaActions from '../../../shared/store/actions/meta.action';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit, OnDestroy {
  @ViewChild('sidenav', {static: true}) sidenavElem: ElementRef;
  public sidenav: models.MaterialInstance;
  public meta: models.Meta;
  public orders$: Observable<string[]>;
  public links = [
    {url: '/admin/review', name: 'Обзор'},
    {url: '/admin/order', name: 'Заказы'},
    {url: '/admin/category', name: 'Категории'},
    {url: '/admin/product', name: 'Товары'},
    {url: '/admin/mail', name: 'Подписки'},
    {url: '/admin/message', name: 'Сообщения'}
  ];

  constructor(private activeRoute: ActivatedRoute, private store: Store<AppState>) {
    this.orders$ = this.store.pipe(select(reducers.getMetaOrders));
  }


  ngOnInit() {
    this.sidenav = services.MaterialService.initSidenav(this.sidenavElem);

    this.activeRoute.data.subscribe(data => {
      const orders = data.admin.newOrder.map( v => v._id);
      this.store.dispatch(new metaActions.Add(orders));
    });
  }

  ngOnDestroy(): void {
    if (this.sidenav) {
      this.sidenav.destroy();
    }
    this.store.dispatch(new metaActions.Clear());
  }

  public openSidenav(event: Event): void {
    event.preventDefault();
    this.sidenav.open();
  }
}
