import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import * as models from 'src/app/shared/interface';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent {
  public category$: Observable<models.Product[]>;

  constructor(private route: ActivatedRoute) {
    this.category$ = this.route.data.pipe(map(data => data.category));
  }
}
