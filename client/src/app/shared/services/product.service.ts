import {Injectable} from "@angular/core";
import {Message, Product, ToastMessage} from "../interface";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: "root"
})

export class ProductService {

  constructor(private http: HttpClient){ }

  fetch(params: any = {}): Observable<Product[]>{
    return this.http.get<Product[]>('/api/position', {
      params: new HttpParams({
        fromObject: params
      })
    })
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

  remove(id: string): Observable<ToastMessage>{
    return this.http.delete<ToastMessage>(`/api/position/${id}`)
  }
}
