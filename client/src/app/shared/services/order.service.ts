import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import * as models from '../../shared/interface';
import {Order, ToastMessage} from 'src/app/shared/interface';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) {
  }

  fetch(): Observable<Order[]> {
    return this.http.get<Order[]>('/api/order');
  }

  getById(id: string): Observable<models.Order> {
    return this.http.get<models.Order>(`/api/order/${id}`);
  }

  create(order: models.Order): Observable<ToastMessage> {
    return this.http.post<ToastMessage>('/api/order', order);
  }

  update(id, order: models.Order): Observable<ToastMessage> {
    return this.http.patch<ToastMessage>(`/api/order/${id}`, order);
  }

  remove(id: string): Observable<ToastMessage> {
    return this.http.delete<ToastMessage>(`/api/order/${id}`);
  }
}
