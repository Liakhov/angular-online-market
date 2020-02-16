import {Injectable} from "@angular/core";
import {Message, OrderPosition, Product, ToastMessage} from "../interface";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Add} from "../store/actions/cart.action";
import {select, Store} from "@ngrx/store";

@Injectable({
  providedIn: "root"
})

export class ProductService {

  cart$: Observable<[]>

  constructor( private http: HttpClient, private store: Store<{ cart: [] }> ){
    this.cart$ = store.pipe(select('cart'))
  }

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

  addCart(product: Product){

    const orderPosition: OrderPosition = {
      _id: product._id,
      name: product.name,
      cost: product.cost,
      quantity: 1
    }

    this.store.dispatch(new Add(orderPosition))
  }

  addWishList(product: Product){
    console.log(`Product add to wish list: ${product}`)
  }
}
