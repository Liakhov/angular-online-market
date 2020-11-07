import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {catchError, mergeMap} from 'rxjs/operators';
import {EMPTY, of} from 'rxjs';

import * as services from './../../shared/services';

@Injectable()
export class CategoryResolver implements Resolve<any> {

  constructor(private categoryService: services.CategoryService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    const id = route.paramMap.get('id');

    return this.categoryService.getAllFromCategory(id)
      .pipe(
        catchError(() => EMPTY),
        mergeMap(data => of(data))
      );
  }
}
