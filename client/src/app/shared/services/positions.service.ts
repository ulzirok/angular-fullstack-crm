import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { IMessage, IPosition } from "../interfaces";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment.prod";

@Injectable({
  providedIn: 'root'
})

export class PositionsService {
  private http = inject(HttpClient);

  get(categoryId?: string): Observable<IPosition[]> {
    return this.http.get<IPosition[]>(`${environment.apiUrl}/position/${categoryId}`);
  }
  
  create(position: IPosition): Observable<IPosition> {
    return this.http.post<IPosition>(`${environment.apiUrl}/position`, position)
  }
  
  update(position: IPosition): Observable<IPosition> {
    return this.http.patch<IPosition>(`${environment.apiUrl}/position/${position._id}`, position)
  }
  
  delete(position: IPosition): Observable<IMessage> {
    return this.http.delete<IMessage>(`${environment.apiUrl}/position/${position._id}`)
  }
}