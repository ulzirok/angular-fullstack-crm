import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { ICategory, IMessage } from "../interfaces";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment.prod";

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private http = inject(HttpClient);

  get(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(`${environment.apiUrl}/category`);
  }

  getById(id: string): Observable<ICategory> {
    return this.http.get<ICategory>(`${environment.apiUrl}/category/${id}`);
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