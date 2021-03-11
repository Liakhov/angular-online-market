import {Component} from '@angular/core';
import {Observable} from 'rxjs';

import * as models from '../../../shared/interface';
import * as services from '../../../shared/services';

@Component({
  selector: 'app-product-page-container',
  templateUrl: './product-page-container.component.html',
  styleUrls: ['./product-page-container.component.scss']
})
export class ProductPageContainerComponent {
  public search;
  public product$: Observable<models.Product[]>;
  public cat$: Observable<models.Category[]>;

  constructor(
    private productService: services.ProductService,
    private categoryService: services.CategoryService) {
    this.product$ = this.productService.fetch();
    this.cat$ = this.categoryService.fetch();
  }

}
