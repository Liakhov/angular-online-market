import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import * as models from '../interface';

@Injectable({
  providedIn: 'root'
})

export class SearchService {
  constructor(private http: HttpClient) {
  }

  fetch(query: string): Observable<models.Category[]> {
    return this.http.get<models.Category[]>(`/api/search?name=${query}`);
  }
}
