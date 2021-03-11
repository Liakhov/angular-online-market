import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import * as models from '../../../shared/interface';

@Component({
  selector: 'app-review-page-container',
  templateUrl: './review-page-container.component.html',
  styleUrls: ['./review-page-container.component.scss']
})
export class ReviewPageContainerComponent {
  public meta$: Observable<models.Meta>;

  constructor(private activeRoute: ActivatedRoute) {
    this.meta$ = this.activeRoute.data.pipe(
      map(data => {
        return {
          newOrders: data.admin.newOrder.length,
          products: data.admin.products.length
        };
      })
    );
  }
}
