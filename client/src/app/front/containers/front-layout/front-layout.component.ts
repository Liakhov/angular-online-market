import {Component, OnDestroy, OnInit} from '@angular/core';
import {EMPTY, Observable, Subject, Subscription} from 'rxjs';
import {Store, select} from '@ngrx/store';
import {catchError, debounceTime, distinctUntilChanged, filter, map, switchMap, take, tap} from 'rxjs/operators';

import * as services from '../../../shared/services';
import * as models from '../../../shared/interface';
import * as state from '../../../shared/store/state/app.state';
import * as reducers from '../../../shared/store/reducers';

@Component({
  selector: 'app-front-layout',
  templateUrl: './front-layout.component.html',
  styleUrls: ['./front-layout.component.scss']
})
export class FrontLayoutComponent implements OnInit, OnDestroy {
  public categories$: Observable<models.Category[]>;
  public cart$: Observable<models.Position[]>;
  public wish$: Observable<models.Position[]>;
  public searchResult = [];
  private search = new Subject();
  private sub: Subscription;

  constructor(
    private mailService: services.MailService,
    private store: Store<state.AppState>,
    private categoriesService: services.CategoryService,
    private searchService: services.SearchService) {
    this.cart$ = this.store.pipe(select(reducers.getCart));
    this.wish$ = this.store.pipe(select(reducers.getWish));
    this.categories$ = this.categoriesService.fetch();
  }

  ngOnInit(): void {
    this.searchChanges();
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
        filter((query: string) => query && query.length > 0),
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
