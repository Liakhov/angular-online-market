import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

import * as models from '../../shared/interface';

@Injectable()

export class ProductService {

  constructor(private http: HttpClient) {
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

  public getHomeProductList(): Observable<models.HomeProductList> {
    return this.http.get<models.HomeProductList>('/api/position/homeProductList');
  }
}
