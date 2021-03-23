import {Component, OnDestroy, OnInit} from '@angular/core';
import {EMPTY, Observable, Subject, Subscription} from 'rxjs';
import {Store, select} from '@ngrx/store';
import {catchError, debounceTime, distinctUntilChanged, filter, map, switchMap, take, tap} from 'rxjs/operators';

import * as services from '../../../shared/services';
import * as models from '../../../shared/interface';

import * as reducers from '../../store/reducers';
import * as cartActions from '../../store/actions/cart.action';
import * as wishActions from '../../store/actions/wish.action';

@Component({
  selector: 'app-home-container',
  templateUrl: './home-container.component.html',
  styleUrls: ['./home-container.component.scss']
})
export class HomeContainerComponent implements OnInit, OnDestroy {
  public categories$: Observable<models.Category[]>;
  public cart$: Observable<models.Position[]>;
  public wish$: Observable<models.Position[]>;
  public searchResult = [];
  private search = new Subject();
  private sub: Subscription;

  constructor(
    private mailService: services.MailService,
    private store$: Store<reducers.State>,
    private categoriesService: services.CategoryService,
    private searchService: services.SearchService,
    private storageService: services.StorageService
  ) {
    this.categories$ = this.categoriesService.fetch();
    this.cart$ = this.store$.pipe(select(reducers.getCart));
    this.wish$ = this.store$.pipe(select(reducers.getWish));
  }

  ngOnInit(): void {
    this.searchChanges();
    this.initCart();
    this.initWish();
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  public async sendMail(email): Promise<void> {
    try {
      const data = await this.mailService.create(email).pipe(take(1)).toPromise();
      services.MaterialService.toast(data.message);
    } catch (e) {
      services.MaterialService.toast(e);
    }
  }

  private searchChanges(): void {
    this.sub = this.search
      .pipe(
        tap((query: string) => {
          if (!query || query && !query.length) {
            this.searchResult.length = 0;
          }
        }),
        filter((query: string) => !!query),
        debounceTime(500),
        distinctUntilChanged(),
        switchMap(query => this.searchService.fetch(query).pipe(catchError(() => EMPTY))),
        map(data => this.searchResult = data)
      )
      .subscribe();
  }

  public onSearch(event): void {
    this.search.next(event);
  }

  private async initCart(): Promise<void> {
    const cart = await this.storageService.get('cart').pipe(take(1)).toPromise();
    if (cart && cart.length) {
      this.store$.dispatch(new cartActions.AddSuccess(cart));
    }
  }

  private async initWish(): Promise<void> {
    const wish = await this.storageService.get('wish').pipe(take(1)).toPromise();
    if (wish && wish.length) {
      this.store$.dispatch(new wishActions.AddSuccess(wish));
    }
  }
}
