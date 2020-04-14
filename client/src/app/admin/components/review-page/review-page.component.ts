import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import * as models from '../../../shared/interface';

@Component({
  selector: 'app-review-page',
  templateUrl: './review-page.component.html',
  styleUrls: ['./review-page.component.scss']
})
export class ReviewPageComponent implements OnInit {
  public meta: models.Meta;

  constructor(private activeRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activeRoute.data.subscribe(data => {
      this.meta = new models.Meta();
      this.meta.newOrders = data.admin.newOrder.length;
      this.meta.products = data.admin.products.length;
    });
  }
}
