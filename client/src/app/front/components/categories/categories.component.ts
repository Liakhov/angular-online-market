import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";

import { Product } from 'src/app/shared/interface';
import { CategoryService } from "../../../shared/services/category.service";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  categories$: Observable<Product[]>
  id: string

  constructor(private route: ActivatedRoute, private categoryService: CategoryService) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');

    this.categories$ = this.categoryService.getAllFromCategory(this.id)
  }

}
