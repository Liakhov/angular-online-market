import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';

import * as models from '../../../shared/interface';
import * as services from '../../../shared/services';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit {
  search;
  product$: Observable<models.Product[]>;
  cat$: Observable<models.Category[]>;

  constructor(private productService: services.ProductService, private categoryService: services.CategoryService) {
  }

  ngOnInit() {
    this.product$ = this.productService.fetch();
    this.cat$ = this.categoryService.fetch();
  }

}
