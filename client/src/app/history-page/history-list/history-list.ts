import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, inject, Input, OnDestroy, ViewChild } from '@angular/core';
import { IOrder } from '../../shared/interfaces';
import { IMaterialInstance, MaterialService } from '../../shared/classes/material.service';

@Component({
  selector: 'app-history-list',
  standalone: false,
  templateUrl: './history-list.html',
  styleUrl: './history-list.scss',
})
export class HistoryList implements OnDestroy, AfterViewInit {
  @Input() orders!: IOrder[]
  @ViewChild('modal') modalRef!: ElementRef
  modal!: IMaterialInstance
  selectedOrder!: IOrder
  
  ngOnDestroy(): void {
    this.modal.destroy()
  }
  
  ngAfterViewInit(): void {
    this.modal = MaterialService.initModal(this.modalRef)
  }
  
  computePrice(order: IOrder): number {
    return order.list.reduce((total, item) => {
      return total += item.cost * (item.quantity ?? 0)
    }, 0)
  }
  
  selectOder(order: IOrder) {
    this.selectedOrder = order
    this.modal.open()
  }
  
  closeModal() {
    this.modal.close()
  }
  
}
