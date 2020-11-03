import {Component} from '@angular/core';
import {Observable} from 'rxjs';
import {Store, select} from '@ngrx/store';
import {take} from 'rxjs/operators';

import * as services from '../../../shared/services';
import * as models from '../../../shared/interface';
import * as state from '../../../shared/store/state/app.state';
import * as reducers from '../../../shared/store/reducers';

@Component({
  selector: 'app-front-layout',
  templateUrl: './front-layout.component.html',
  styleUrls: ['./front-layout.component.scss']
})
export class FrontLayoutComponent {
  public categories$: Observable<models.Category[]>;
  public cart$: Observable<models.Position[]>;
  public wish$: Observable<models.Position[]>;

  constructor(
    private mailService: services.MailService,
    private store: Store<state.AppState>,
    private categoriesService: services.CategoryService) {
    this.cart$ = this.store.pipe(select(reducers.getCart));
    this.wish$ = this.store.pipe(select(reducers.getWish));
    this.categories$ = this.categoriesService.fetch();
  }

  public async sendMail(email): Promise<void> {
    try {
      const data = await this.mailService.create(email).pipe(take(1)).toPromise();
      services.MaterialService.toast(data.message);
    } catch (e) {
      services.MaterialService.toast(e);
    }
  }
}
