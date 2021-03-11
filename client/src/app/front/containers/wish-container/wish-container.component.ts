import {Component} from '@angular/core';
import {Store, select} from '@ngrx/store';
import {Observable} from 'rxjs';

import {AppState} from '../../../shared/store/state/app.state';

import * as models from '../../../shared/interface';
import * as reducers from '../../../shared/store/reducers';
import * as actions from '../../../shared/store/actions/wish.action';

@Component({
  selector: 'app-wish-container',
  templateUrl: './wish-container.component.html',
  styleUrls: ['./wish-container.component.scss']
})
export class WishContainerComponent {
  public wish$: Observable<models.Position[]>;

  constructor(private store: Store<AppState>) {
    this.wish$ = this.store.pipe(select(reducers.getWish));
  }

  public remove(item): void {
    this.store.dispatch(new actions.Remove(item));
  }

  public reset(): void {
    this.store.dispatch(new actions.Clear());
  }
}
