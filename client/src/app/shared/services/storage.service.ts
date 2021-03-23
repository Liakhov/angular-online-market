import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {LocalStorage} from '@ngx-pwa/local-storage';

@Injectable({
  providedIn: 'root'
})

export class StorageService {

  constructor(private storage: LocalStorage) {
  }

  public set(key: string, data: {}): Observable<boolean> {
    return this.storage.setItem(key, data);
  }

  public get(key: string): Observable<any> {
    return this.storage.getItem(key);
  }

  public remove(key: string): Observable<boolean> {
    return this.storage.removeItem(key);
  }
}
