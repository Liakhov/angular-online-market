import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';

import * as models from '../../../shared/interface';

@Component({
  selector: 'app-product-list-container',
  templateUrl: './product-list-container.component.html',
  styleUrls: ['./product-list-container.component.scss']
})
export class ProductListContainerComponent {
  public products$: Observable<models.Product[]>;

  constructor(private activeRoute: ActivatedRoute) {
    this.products$ = this.activeRoute.data.pipe(
      map(data => data.products)
    );
  }
}
