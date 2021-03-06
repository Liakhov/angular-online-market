import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {catchError, mergeMap} from 'rxjs/operators';
import {EMPTY, of} from 'rxjs';

import * as services from '../services';

@Injectable()
export class ProductResolver implements Resolve<any> {

  constructor(private productService: services.ProductService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    const id = route.paramMap.get('id');

    return this.productService.getByID(id)
      .pipe(
        catchError(() => EMPTY),
        mergeMap(data => of(data))
      );
  }
}
