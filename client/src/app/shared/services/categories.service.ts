import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { ICategory, IMessage } from "../interfaces";
import { map, Observable } from "rxjs";
import { environment } from "../../../environments/environment.prod";

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl.replace('/api', '');
  
  get(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(`${environment.apiUrl}/category`).pipe(
      map(categories => {
        // Добавляем полный URL к imageSrc для каждой категории
        return categories.map(category => {
          if (category.imageSrc && !category.imageSrc.startsWith('http')) {
            category.imageSrc = this.baseUrl + '/' + category.imageSrc;
          }
          return category;
        });
      })
    );
  }

  getById(id: string): Observable<ICategory> {
    return this.http.get<ICategory>(`${environment.apiUrl}/category/${id}`).pipe(
      map(category => {
        // Добавляем полный URL к imageSrc для одной категории, полученной по ID
        if (category.imageSrc && !category.imageSrc.startsWith('http')) {
          category.imageSrc = this.baseUrl + '/' + category.imageSrc;
        }
        return category;
      })
    );
  }

  create(name: string, image?: File): Observable<ICategory> {
    const fd = new FormData();

    if (image) {
      fd.append('image', image, image.name);
    }
    fd.append('name', name);
    return this.http.post<ICategory>(`${environment.apiUrl}/category`, fd);
  }

  update(id: string | undefined, name: string, image?: File): Observable<ICategory> {
    const fd = new FormData();

    if (image) {
      fd.append('image', image, image.name);
    }
    fd.append('name', name);
    return this.http.patch<ICategory>(`${environment.apiUrl}/category/${id}`, fd);
  }

  delete(id: string): Observable<IMessage> {
    return this.http.delete<IMessage>(`${environment.apiUrl}/category/${id}`);
  }
}