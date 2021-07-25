import {Component} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';

import * as models from '../../../shared/interface';

import {AppState} from '../../../store/app.state';
import {selectConfigNewItems, selectConfigRecommended} from '../../store/selectors/config.selectors';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})

export class HomeComponent {
  public recommended$: Observable<Array<models.Product>>;
  public newItems$: Observable<Array<models.Product>>;

  constructor(private store$: Store<AppState>) {
    this.recommended$ = store$.select(selectConfigRecommended);
    this.newItems$ = store$.select(selectConfigNewItems);
  }
}
