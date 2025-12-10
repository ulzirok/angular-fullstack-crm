import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { IMessage, IPosition } from "../interfaces";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class PositionsService {
  private http = inject(HttpClient);

  get(categoryId?: string): Observable<IPosition[]> {
    return this.http.get<IPosition[]>(`/api/position/${categoryId}`);
  }
  
  create(position: IPosition): Observable<IPosition> {
    return this.http.post<IPosition>('/api/position', position)
  }
  
  update(position: IPosition): Observable<IPosition> {
    return this.http.patch<IPosition>(`/api/position/${position._id}`, position)
  }
  
  delete(position: IPosition): Observable<IMessage> {
    return this.http.delete<IMessage>(`api/position/${position._id}`)
  }
}