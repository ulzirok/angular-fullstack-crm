import { HttpClient } from "@angular/common/http";
import { inject, Injectable, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { IAnalyticsPage, IOverviewPage } from "../interfaces";

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService implements OnInit{
  private http = inject(HttpClient)
  
  ngOnInit(): void {
    
  }
  
  getOverview(): Observable<IOverviewPage> {
    return this.http.get<IOverviewPage>('/api/analytics/overview')
  }
  
  getAnalytics(): Observable<IAnalyticsPage> {
    return this.http.get<IAnalyticsPage>('/api/analytics/analytics')
  }
}