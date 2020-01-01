import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Mail, Message} from '../interface';

@Injectable({
  providedIn: 'root'
})
export class MailService {

  constructor(private http: HttpClient){

  }
  create(email: Mail): Observable<Message>{
    return this.http.post<Message>('/api/mail', email)
  }


  fetch(): Observable<Mail[]>{
    return this.http.get<Mail[]>('/api/mail')
  }

  update(id: string, mail: Mail): Observable<Mail>{
    return this.http.patch<Mail>(`/api/mail/${id}`, mail)
  }

  remove(id: string): Observable<Message>{
      return this.http.delete<Message>(`/api/mail/${id}`)
  }
}
