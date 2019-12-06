import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Order} from 'src/app/shared/interface';

@Injectable({
  providedIn: "root"
})
export class OrderService {

  constructor(private http: HttpClient){

  }

  fetch(): Observable<Order[]>{
    return this.http.get<Order[]>('assets/order.json')
  }
}
