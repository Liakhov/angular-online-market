import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {Config} from '../../shared/interface';

@Injectable()
export class ConfigService {

  constructor(private http: HttpClient) {
  }

  public getConfig(): Observable<Config> {
    return this.http.get<Config>(`/api/position/config`);
  }
}
