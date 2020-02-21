import {Component, OnDestroy, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from "rxjs";

import { ProductService } from "../../../shared/services/product.service";
import { Product } from "../../../shared/interface";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, OnDestroy {

  product: Product
  productSub: Subscription
  id: string

  constructor(
    private activeRoute: ActivatedRoute,
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.id = this.activeRoute.snapshot.params['id'];

    this.productSub = this.productService.getByID(this.id).subscribe(data => {
      this.product = data
    })
  }

  ngOnDestroy(): void {
    if(this.productSub) {
      this.productSub.unsubscribe()
    }
  }

  addToCart(product){
    this.productService.addCart(product)
  }
}
