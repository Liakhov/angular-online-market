import {Component} from '@angular/core';
import {Observable} from 'rxjs';

import * as services from '../../../shared/services';
import * as models from '../../../shared/interface';

@Component({
  selector: 'app-front-page',
  templateUrl: './front-page.component.html',
  styleUrls: ['./front-page.component.scss'],
})

export class FrontPageComponent {
  public categories$: Observable<models.Category[]>;
  public products$: Observable<models.Product[]>;
  public limit = 4;

  constructor(
    private categoriesService: services.CategoryService,
    private productService: services.ProductService) {

    this.categories$ = this.categoriesService.fetch();
    this.products$ = this.productService.fetch({
      limit: this.limit
    });
  }
}
