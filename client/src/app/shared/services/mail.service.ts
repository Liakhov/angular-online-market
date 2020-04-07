import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import * as models from '../interface';

@Injectable({
  providedIn: 'root'
})
export class MailService {
  constructor(private http: HttpClient) { }

  create(email: models.Mail): Observable<models.Message> {
    return this.http.post<models.Message>('/api/mail', email);
  }

  fetch(): Observable<models.Mail[]> {
    return this.http.get<models.Mail[]>('/api/mail');
  }

  update(id: string, mail: models.Mail): Observable<models.Mail> {
    return this.http.patch<models.Mail>(`/api/mail/${id}`, mail);
  }

  remove(id: string): Observable<models.ToastMessage> {
    return this.http.delete<models.ToastMessage>(`/api/mail/${id}`);
  }
}
