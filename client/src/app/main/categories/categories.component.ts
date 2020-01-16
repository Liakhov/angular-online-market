import { Component, OnInit } from '@angular/core';
import {CategoryService} from "../../shared/services/category.service";
import {Observable} from "rxjs";
import {Product} from 'src/app/shared/interface';
import {ActivatedRoute} from "@angular/router";

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
