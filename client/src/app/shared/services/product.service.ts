import {Injectable} from "@angular/core";
import {Message, Product} from "../interface";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: "root"
})

export class ProductService {

  constructor(private http: HttpClient){ }

  fetch(): Observable<Product[]>{
    return this.http.get<Product[]>('/api/position')
  }

  getByID(id: string): Observable<Product>{
    return this.http.get<Product>(`/api/position/${id}`)
  }

  create(product: Product): Observable<Product>{
    return this.http.post<Product>('/api/position', product)
  }

  update(id, product): Observable<Product>{
    return this.http.patch<Product>(`/api/position/${id}`, product)
  }

  remove(id: string): Observable<Message>{
    return this.http.delete<Message>(`/api/position/${id}`)
  }
}
