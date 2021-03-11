import {Component} from '@angular/core';
import {Observable} from 'rxjs';

import * as services from '../../../shared/services';
import * as models from '../../../shared/interface';

@Component({
  selector: 'app-category-container',
  templateUrl: './category-container.component.html',
  styleUrls: ['./category-container.component.scss']
})
export class CategoryContainerComponent {
  public search: string;
  public cat$: Observable<models.Category[]>;

  constructor(private categoryService: services.CategoryService) {
    this.cat$ = this.categoryService.fetch();
  }
}
