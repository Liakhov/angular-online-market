import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import * as models from '../interface';

@Injectable({
  providedIn: 'root'
})

export class MetaServices {
  constructor(private http: HttpClient) { }

  fetch(): Observable<models.Meta> {
    return this.http.get<models.Meta>('/api/meta');
  }
}
