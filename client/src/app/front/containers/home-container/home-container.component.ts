import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {EMPTY, Observable, Subject, Subscription} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, filter, map, switchMap, take, tap} from 'rxjs/operators';

import * as models from '../../../shared/interface';
import * as services from '../../../shared/services';
import * as cartActions from '../../store/actions/cart.action';
import * as wishActions from '../../store/actions/wish.action';
import * as reducers from '../../store/reducers';
import {selectConfigCategories} from '../../store/selectors/config.selectors';

@Component({
  selector: 'app-home-container',
  templateUrl: './home-container.component.html',
  styleUrls: ['./home-container.component.scss']
})
export class HomeContainerComponent implements OnInit, OnDestroy {
  public cart$: Observable<models.Position[]>;
  public wish$: Observable<models.Position[]>;
  public searchResult = [];
  private search = new Subject();
  private sub: Subscription;
  public categories$: Observable<models.Category[]>;

  constructor(
    private activeRoute: ActivatedRoute,
    private mailService: services.MailService,
    private store$: Store<reducers.State>,
    private searchService: services.SearchService
  ) {
    this.cart$ = this.store$.pipe(select(reducers.getCart));
    this.wish$ = this.store$.pipe(select(reducers.getWish));
    this.categories$ = this.store$.select(selectConfigCategories);
  }

  ngOnInit(): void {
    this.searchChanges();
    this.store$.dispatch(new cartActions.Init());
    this.store$.dispatch(new wishActions.Init());
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
}
