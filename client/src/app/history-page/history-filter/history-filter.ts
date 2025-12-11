import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, EventEmitter, inject, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { IFilter } from '../../shared/interfaces';
import { IMaterialDatepicker, MaterialService } from '../../shared/classes/material.service';

@Component({
  selector: 'app-history-filter',
  standalone: false,
  templateUrl: './history-filter.html',
  styleUrl: './history-filter.scss',
})
export class HistoryFilter implements OnDestroy, AfterViewInit {
  @Output() onFilter = new EventEmitter<IFilter>()
  @ViewChild('start') startRef?: ElementRef
  @ViewChild('end') endRef?: ElementRef
  order?: number
  start?: IMaterialDatepicker
  end?: IMaterialDatepicker
  isValid = true
  private cdr = inject(ChangeDetectorRef)
  
  ngOnDestroy(): void {
    this.start?.destroy()
    this.end?.destroy()
  }
  
  ngAfterViewInit(): void {
    if (this.startRef) {
      this.start = MaterialService.initDatepicker(this.startRef, this.validate.bind(this))
    }
    if (this.endRef) {
      this.end = MaterialService.initDatepicker(this.endRef, this.validate.bind(this))
    }
  }
  
  submitFilter() {
    const filter: IFilter = {}
    if (this.order) {
      filter.order = this.order
    }
    if (this.start?.date) {
      filter.start = this.start.date
    }
    if (this.end?.date) {
      filter.end = this.end.date
    }
    
    this.onFilter.emit(filter)
  }
  
  validate() {
    if (!this.start?.date || !this.end?.date) {
      this.isValid = true;
      return
    }
    
    this.isValid = this.start?.date <= this.end?.date
    this.cdr.detectChanges()
  }
}
