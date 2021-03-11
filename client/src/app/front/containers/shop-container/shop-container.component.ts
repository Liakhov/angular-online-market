import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import * as models from '../../../shared/interface';

@Component({
  selector: 'app-shop-container',
  templateUrl: './shop-container.component.html',
  styleUrls: ['./shop-container.component.scss']
})
export class ShopContainerComponent {
  public products$: Observable<models.Product[]>;

  constructor(private activeRoute: ActivatedRoute) {
    this.products$ = this.activeRoute.data.pipe(
      map(data => data.products)
    );
  }
}
