import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { ICategory } from "../interfaces";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private http = inject(HttpClient)
  
  get(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>('/api/category')
  }
  
  getById(id: string): Observable<ICategory> {
    return this.http.get<ICategory>(`/api/category/${id}`)
  }
  
  create(name: string, image?: File): Observable<ICategory> {
    const fd = new FormData()
    
    if (image) {
      fd.append('image', image, image.name)
    }
    fd.append('name', name)
    return this.http.post<ICategory>('/api/category', fd)
  }
  
  update(id: string | undefined, name: string, image?: File): Observable<ICategory> {
    const fd = new FormData()
    
    if (image) {
      fd.append('image', image, image.name)
    }
    fd.append('name', name)
    return this.http.patch<ICategory>(`/api/category/${id}`, fd)
  }
}