import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AnalyticsService } from '../shared/services/analytics.service';
import { Observable } from 'rxjs';
import { IOverviewPage } from '../shared/interfaces';
import { IMaterialInstance, MaterialService } from '../shared/classes/material.service';

@Component({
  selector: 'app-overview-page',
  standalone: false,
  templateUrl: './overview-page.html',
  styleUrl: './overview-page.scss',
})
export class OverviewPage implements OnInit, OnDestroy, AfterViewInit{
  @ViewChild('tapTarget') tapTargetRef!: ElementRef
  data$!: Observable<IOverviewPage>
  tapTarget?: IMaterialInstance
  yesterday: Date = new Date()
  private analyticsService = inject(AnalyticsService)
  private cdr = inject(ChangeDetectorRef)
  
  ngOnInit(): void {
    this.data$ = this.analyticsService.getOverview()
    this.yesterday.setDate(this.yesterday.getDate() - 1)
    this.cdr.detectChanges()
  }
  
  ngOnDestroy(): void {
    if (this.tapTarget) {
      this.tapTarget.destroy()
    }
  }
  
  ngAfterViewInit(): void {
    this.tapTarget = MaterialService.initTapTarget(this.tapTargetRef)
  }
  
  openInfo() {
    if (this.tapTarget) {
      this.tapTarget.open()
    }
  }
}
