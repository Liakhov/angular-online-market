import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';

import * as services from '../../../shared/services';
import {Product} from 'src/app/shared/interface';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  public categories$: Observable<Product[]>;
  public id: string;

  constructor(private route: ActivatedRoute, private categoryService: services.CategoryService) {
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');

    this.categories$ = this.categoryService.getAllFromCategory(this.id);
  }
}
