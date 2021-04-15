import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';

import {AppState} from '../../store/app.state';

import * as models from '../../shared/interface';

@Injectable()

export class ProductService {

  constructor(private http: HttpClient, private store: Store<AppState>) {
  }

  public fetch(params: any = {}): Observable<models.Product[]> {
    return this.http.get<models.Product[]>('/api/admin/position', {
      params: new HttpParams({
        fromObject: params
      })
    });
  }

  public getByID(id: string): Observable<models.Product> {
    return this.http.get<models.Product>(`/api/admin/position/${id}`);
  }

  public create(product): Observable<models.Product> {
    const fd = this.createFormData(product);

    return this.http.post<models.Product>('/api/admin/position', fd);
  }

  public update(id, product): Observable<models.Product> {
    const fd = this.createFormData(product);

    return this.http.patch<models.Product>(`/api/admin/position/${id}`, fd);
  }

  public remove(id: string): Observable<models.ToastMessage> {
    return this.http.delete<models.ToastMessage>(`/api/admin/position/${id}`);
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
