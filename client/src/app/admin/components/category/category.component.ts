import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';

import * as services from '../../../shared/services';
import * as models from '../../../shared/interface';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  search;
  cat$: Observable<models.Category[]>;

  constructor(private categoryService: services.CategoryService) {
  }

  ngOnInit() {
    this.cat$ = this.categoryService.fetch();
  }

}
