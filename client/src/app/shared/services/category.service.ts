import {Injectable} from "@angular/core";
import {Category, Product, ToastMessage} from "../interface";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient){

  }

  fetch(): Observable<Category[]>{
    return this.http.get<Category[]>('/api/category')
  }

  getByID(id: string): Observable<Category>{
    return this.http.get<Category>(`/api/category/${id}`)
  }

  update(id: string, name: string, description?: string, image?: File): Observable<Category>{

    const category = new FormData()
    category.append('name', name)
    if(image){
      category.append('image', image, image.name)
    }
    if(description){
      category.append('description', description)
    }

    return this.http.patch<Category>(`/api/category/${id}`, category)
  }

  create(name: string, description?: string, image?: File): Observable<Category>{

    const category = new FormData()
    category.append('name', name)

    if(image){
      category.append('image', image, image.name)
    }
    if(description){
      category.append('description', description)
    }
    return this.http.post<Category>('/api/category', category)
  }

  remove(id: string): Observable<ToastMessage>{
    return this.http.delete<ToastMessage>(`/api/category/${id}`)
  }

  getAllFromCategory(id: string): Observable<Product[]>{
    return this.http.get<Product[]>(`/api/position/allpositions/${id}`)
  }

}
