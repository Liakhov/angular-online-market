import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import * as models from '../../shared/interface';

@Injectable()
export class BrandService {

  constructor(private http: HttpClient) {
  }

  fetch(): Observable<models.Brand[]> {
    return this.http.get<models.Brand[]>('/api/admin/brand');
  }

  getById(id: string): Observable<models.Brand> {
    return this.http.get<models.Brand>(`/api/admin/brand/${id}`);
  }

  create(brand: models.Brand): Observable<models.ToastMessage> {
    const fd = this.createFormData(brand);

    return this.http.post<models.ToastMessage>('/api/admin/brand', fd);
  }

  update(id, brand: models.Brand): Observable<models.Brand> {
    const fd = this.createFormData(brand);

    return this.http.patch<models.Brand>(`/api/admin/brand/${id}`, fd);
  }

  remove(id: string): Observable<models.ToastMessage> {
    return this.http.delete<models.ToastMessage>(`/api/admin/brand/${id}`);
  }

  private createFormData(brand: models.Brand): FormData {
    const fd = new FormData();

    Object.keys(brand).forEach(key => {

      if (Array.isArray(brand[key])) {
        for (const item of brand[key]) {
          if (item instanceof File) {
            fd.append('logo', item, item.name);
          } else {
            fd.append(`${key}[]`, item);
          }
        }
      } else {
        fd.append(key, brand[key]);
      }
    });
    return fd;
  }
}
