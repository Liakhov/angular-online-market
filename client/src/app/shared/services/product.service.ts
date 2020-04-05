import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';

import {AppState} from '../store/state/app.state';

import * as cartAction from '../store/actions/cart.action';
import * as wishAction from '../store/actions/wish.action';
import {Position, Product, ToastMessage} from '../interface';

@Injectable({
  providedIn: 'root'
})

export class ProductService {

  constructor(private http: HttpClient, private store: Store<AppState>) { }

  public fetch(params: any = {}): Observable<Product[]> {
    return this.http.get<Product[]>('/api/position', {
      params: new HttpParams({
        fromObject: params
      })
    });
  }

  public getByID(id: string): Observable<Product> {
    return this.http.get<Product>(`/api/position/${id}`);
  }

  public create(product): Observable<Product> {
    const fd = this.createFormData(product);

    return this.http.post<Product>('/api/position', fd);
  }

  public update(id, product): Observable<Product> {
    const fd = this.createFormData(product);

    return this.http.patch<Product>(`/api/position/${id}`, fd);
  }

  public remove(id: string): Observable<ToastMessage> {
    return this.http.delete<ToastMessage>(`/api/position/${id}`);
  }

  public addCart(product: Product): void {
    const img = product.images[0] || '';

    const orderPosition: Position = {
      _id: product._id,
      name: product.name,
      cost: product.cost,
      image: img,
      quantity: 1
    };

    this.store.dispatch(new cartAction.Add(orderPosition));
  }

  public addWishList(product: Product): void {
    const img = product.images[0] || '';

    const orderPosition: Position = {
      _id: product._id,
      name: product.name,
      cost: product.cost,
      image: img,
      quantity: 1
    };

    this.store.dispatch(new wishAction.Add(orderPosition));
  }

  private createFormData(product: Product): FormData {
    const fd = new FormData();

    Object.keys(product).forEach(key => {

      if (Array.isArray(product[key])) {

        for (const item of product[key]) {
          if (item instanceof File) {
            fd.append('image', item, item['name']);
          } else {
            fd.append(`${key}[]`, item);
          }
        }
      } else {
        fd.append(key, product[key]);
      }
    });
    return fd;
  }
}
