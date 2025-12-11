import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { IMaterialInstance, MaterialService } from '../shared/classes/material.service';
import { OrdersService } from '../shared/services/orders.service';
import { Subscription } from 'rxjs';
import { IFilter, IOrder } from '../shared/interfaces';

const STEP = 2;

@Component({
  selector: 'app-history-page',
  standalone: false,
  templateUrl: './history-page.html',
  styleUrl: './history-page.scss',
})
export class HistoryPage implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('tooltip') tooltipRef!: ElementRef;
  isFilterVisible = false;
  tooltip!: IMaterialInstance;
  offset = 0;
  limit = STEP;
  oSub!: Subscription;
  orders: IOrder[] = [];
  loading = false
  reloading = false
  noMoreOrders = false
  filter: IFilter = {}
  private ordersService = inject(OrdersService);
  private cdr = inject(ChangeDetectorRef)
  
  ngOnInit(): void {
    this.reloading = true;
    this.get();
  }

  ngOnDestroy(): void {
    this.tooltip.destroy();
    if (this.oSub) {
      this.oSub.unsubscribe();
    }
  }

  ngAfterViewInit(): void {
    this.tooltip = MaterialService.initTooltip(this.tooltipRef);
  }

  get() {
    const params = Object.assign({}, this.filter, {
      offset: this.offset,
      limit: this.limit
    })
    
    this.oSub = this.ordersService.get(params).subscribe((orders) => {
      this.orders = this.orders.concat(orders);
      this.noMoreOrders = orders.length < STEP
      this.loading = false;
      this.reloading = false;
      this.cdr.detectChanges();
    });
  }

  loadMore() {
    this.offset += STEP;
    this.loading = true;
    this.get();
  }
  
  applyFilter(filter: IFilter) {
    this.orders = []
    this.offset = 0
    this.filter = filter
    this.reloading = true
    this.get()
  }
  
  isFiltered(): boolean {
    return Object.keys(this.filter).length !== 0
  }
}
