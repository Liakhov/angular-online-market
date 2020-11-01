import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import * as models from '../../../shared/interface';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent {
  public products: models.Product[];

  constructor(private activeRoute: ActivatedRoute) {
    this.activeRoute.data.subscribe(data => {
      this.products = data.shop;
    });
  }
}
