import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';

import { Add} from '../store/actions/cart.action';
import { OrderPosition, Product, ToastMessage } from '../interface';

@Injectable({
  providedIn: 'root'
})

export class ProductService {

  cart$: Observable<[]>;

  constructor( private http: HttpClient, private store: Store<{ cart: [] }> ) {
    this.cart$ = store.pipe(select('cart'));
  }

  fetch(params: any = {}): Observable<Product[]> {
    return this.http.get<Product[]>('/api/position', {
      params: new HttpParams({
        fromObject: params
      })
    });
  }

  getByID(id: string): Observable<Product> {
    return this.http.get<Product>(`/api/position/${id}`);
  }

  create(product): Observable<Product> {
    const fd = this.createFormData(product);

    return this.http.post<Product>('/api/position', fd);
  }

  update(id, product): Observable<Product> {
    const fd = this.createFormData(product);

    return this.http.patch<Product>(`/api/position/${id}`, fd);
  }

  remove(id: string): Observable<ToastMessage> {
    return this.http.delete<ToastMessage>(`/api/position/${id}`);
  }

  addCart(product: Product): void {

    const orderPosition: OrderPosition = {
      _id: product._id,
      name: product.name,
      cost: product.cost,
      quantity: 1
    };

    this.store.dispatch(new Add(orderPosition));
  }

  addWishList(product: Product): void {
    console.log(`Product add to wish list: ${product}`);
  }

  private createFormData(product: Product): FormData {

    const fd = new FormData();

    Object.keys(product).forEach(key => {
      if( Array.isArray(product[key]) ){
        for(const img of product[key]){
          if(img instanceof File){
            fd.append('image', img, img['name'])
          }
        }
      }else{
        fd.append(key, product[key])
      }
    });
    return fd
  }
}
