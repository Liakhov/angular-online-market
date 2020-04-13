import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {catchError, mergeMap} from 'rxjs/operators';
import {EMPTY, of} from 'rxjs';

import * as services from './../../shared/services';

@Injectable()
export class ShopResolver implements Resolve<any> {

  constructor(private productService: services.ProductService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {

    return this.productService.fetch()
      .pipe(
        catchError(() => EMPTY),
        mergeMap(data => of(data))
      );
  }
}
