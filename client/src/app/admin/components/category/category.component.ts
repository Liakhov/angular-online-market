import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";

import { CategoryService } from '../../../shared/services/category.service';
import { Category } from '../../../shared/interface';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  search
  cat$: Observable<Category[]>

  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    this.cat$ = this.categoryService.fetch()
  }

}
