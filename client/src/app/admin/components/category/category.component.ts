import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";

import { Category } from '../../../shared/interface';
import { CategoryService } from '../../../shared/services/category.service';

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
