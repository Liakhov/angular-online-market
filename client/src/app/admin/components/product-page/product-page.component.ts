import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";

import { Category, Product } from "../../../shared/interface";
import { ProductService } from "../../../shared/services/product.service";
import { CategoryService } from "../../../shared/services/category.service";

@Component({
  selector: "app-product-page",
  templateUrl: "./product-page.component.html",
  styleUrls: ["./product-page.component.scss"]
})
export class ProductPageComponent implements OnInit {
  search
  product$: Observable<Product[]>
  cat$: Observable<Category[]>

  constructor(private productService: ProductService, private categoryService: CategoryService) {}

  ngOnInit() {
    this.product$ = this.productService.fetch()
    this.cat$ = this.categoryService.fetch()
  }

}
