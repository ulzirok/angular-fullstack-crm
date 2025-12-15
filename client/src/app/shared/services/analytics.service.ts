import { HttpClient } from "@angular/common/http";
import { inject, Injectable, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { IAnalyticsPage, IOverviewPage } from "../interfaces";
import { environment } from "../../../environments/environment.prod";

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService implements OnInit{
  private http = inject(HttpClient)
  
  ngOnInit(): void {
    
  }
  
  getOverview(): Observable<IOverviewPage> {
    return this.http.get<IOverviewPage>(`${environment.apiUrl}/analytics/overview`)
  }
  
  getAnalytics(): Observable<IAnalyticsPage> {
    return this.http.get<IAnalyticsPage>(`${environment.apiUrl}/analytics/analytics`)
  }
}