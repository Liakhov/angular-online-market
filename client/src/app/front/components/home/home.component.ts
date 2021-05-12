import {Component} from '@angular/core';
import {Observable} from 'rxjs';

import * as services from '../../services';
import * as models from '../../../shared/interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})

export class HomeComponent {
  public list$: Observable<models.HomeProductList>;

  constructor(private productService: services.ProductService) {
    this.list$ = this.productService.getHomeProductList();
  }
}
