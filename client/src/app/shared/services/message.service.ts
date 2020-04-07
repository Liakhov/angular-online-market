import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {Message, ToastMessage} from '../interface';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private http: HttpClient) {
  }

  fetch(): Observable<Message[]> {
    return this.http.get<Message[]>('/api/message/');
  }

  remove(id: string): Observable<ToastMessage> {
    return this.http.delete<ToastMessage>(`/api/message/${id}`);
  }

  sendMessage(form: Message) {
    return this.http.post<Message>(`/api/message/`, {
      name: form.name,
      email: form.email,
      message: form.message
    });
  }
}
