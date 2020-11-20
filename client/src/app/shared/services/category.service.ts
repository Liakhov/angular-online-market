import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import * as models from '../interface';

@Injectable({
  providedIn: 'root'
})

export class CategoryService {
  constructor(private http: HttpClient) {
  }

  fetch(): Observable<models.Category[]> {
    return this.http.get<models.Category[]>('/api/category');
  }

  getByID(id: string): Observable<models.Category> {
    return this.http.get<models.Category>(`/api/category/${id}`);
  }

  update(id: string, name: string, description?: string, image?: File): Observable<models.Category> {
    const category = new FormData();
    category.append('name', name);
    if (image) {
      category.append('image', image, image.name);
    }
    if (image === null) {
      category.append('image', null);
    }
    if (description) {
      category.append('description', description);
    }

    return this.http.patch<models.Category>(`/api/category/${id}`, category);
  }

  create(name: string, description?: string, image?: File): Observable<models.ToastMessage> {
    const category = new FormData();
    category.append('name', name);

    if (image) {
      category.append('image', image, image.name);
    }

    if (description) {
      category.append('description', description);
    }
    return this.http.post<models.ToastMessage>('/api/category', category);
  }

  remove(id: string): Observable<models.ToastMessage> {
    return this.http.delete<models.ToastMessage>(`/api/category/${id}`);
  }

  getAllFromCategory(id: string): Observable<models.Product[]> {
    return this.http.get<models.Product[]>(`/api/position/allpositions/${id}`);
  }
}
