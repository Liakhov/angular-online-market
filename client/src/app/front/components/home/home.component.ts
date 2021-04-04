import {Component} from '@angular/core';
import {Observable} from 'rxjs';

import * as services from '../../../shared/services';
import * as models from '../../../shared/interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})

export class HomeComponent {
  public categories$: Observable<models.Category[]>;
  public products$: Observable<models.Product[]>;
  public list$: Observable<models.HomeProductList>;
  public limit = 4;

  constructor(
    private categoriesService: services.CategoryService,
    private productService: services.ProductService
  ) {
    this.categories$ = this.categoriesService.fetch();
    this.products$ = this.productService.fetch({
      limit: this.limit
    });
    this.list$ = this.productService.getHomeProductList();
  }
}
