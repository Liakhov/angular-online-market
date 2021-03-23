import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';

import {AppState} from '../../store/app.state';

import * as wishAction from '../../front/store/actions/wish.action';
import * as models from '../interface';

@Injectable({
  providedIn: 'root'
})

export class ProductService {

  constructor(private http: HttpClient, private store: Store<AppState>) {
  }

  public fetch(params: any = {}): Observable<models.Product[]> {
    return this.http.get<models.Product[]>('/api/position', {
      params: new HttpParams({
        fromObject: params
      })
    });
  }

  public getByID(id: string): Observable<models.Product> {
    return this.http.get<models.Product>(`/api/position/${id}`);
  }

  public create(product): Observable<models.Product> {
    const fd = this.createFormData(product);

    return this.http.post<models.Product>('/api/position', fd);
  }

  public update(id, product): Observable<models.Product> {
    const fd = this.createFormData(product);

    return this.http.patch<models.Product>(`/api/position/${id}`, fd);
  }

  public remove(id: string): Observable<models.ToastMessage> {
    return this.http.delete<models.ToastMessage>(`/api/position/${id}`);
  }

  public addWishList(product: models.Product): void {
    const img = product.images[0] || '';

    const orderPosition: models.Position = {
      _id: product._id,
      name: product.name,
      cost: product.cost,
      image: img,
      quantity: 1
    };

    this.store.dispatch(new wishAction.Add(orderPosition));
  }

  private createFormData(product: models.Product): FormData {
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
