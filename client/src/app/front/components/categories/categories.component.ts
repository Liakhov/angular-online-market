import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';

import * as services from '../../../shared/services';
import * as models from 'src/app/shared/interface';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent {
  private id: string;
  public categories$: Observable<models.Product[]>;

  constructor(private route: ActivatedRoute, private categoryService: services.CategoryService) {
    this.id = this.route.snapshot.paramMap.get('id');
    this.categories$ = this.categoryService.getAllFromCategory(this.id);
  }
}
