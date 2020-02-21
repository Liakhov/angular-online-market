import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";

import { ProductService } from "../../../shared/services/product.service";
import { Product } from "../../../shared/interface";

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  products$: Observable<Product[]>

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.products$ = this.productService.fetch()
  }

}
