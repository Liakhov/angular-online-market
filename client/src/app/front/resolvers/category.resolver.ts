import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {EMPTY, of} from 'rxjs';
import {catchError, mergeMap} from 'rxjs/operators';

import * as services from '../services';

@Injectable()
export class CategoryResolver implements Resolve<any> {

  constructor(private productService: services.ProductService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    const id = route.paramMap.get('id');

    return this.productService.fetch({category: id})
      .pipe(
        catchError(() => EMPTY),
        mergeMap(data => of(data))
      );
  }
}
