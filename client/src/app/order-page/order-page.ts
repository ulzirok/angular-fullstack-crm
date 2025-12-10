import { AfterViewInit, Component, ElementRef, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { MaterialService } from '../shared/classes/material.service';
import { OrderService } from './order.service';
import { IOrder, IOrderPosition } from '../shared/interfaces';
import { OrdersService } from '../shared/services/orders.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-order-page',
  standalone: false,
  templateUrl: './order-page.html',
  styleUrl: './order-page.scss',
  providers: [OrderService]
})
export class OrderPage implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('modal') modalRef?: ElementRef
  isRoot!: boolean
  modal: any
  pending = false
  oSub!: Subscription
  private router = inject(Router)
  public orderService = inject(OrderService) //сервис для UI
  private ordersService = inject(OrdersService) //сервис для работы с бекендом
  
  ngOnInit(): void {
    this.isRoot = this.router.url === '/order'
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isRoot = this.router.url === '/order'
      }
    })
  }
  
  ngAfterViewInit(): void {
    if (this.modalRef) {
      this.modal = MaterialService.initModal(this.modalRef)
    }
  }
  
  ngOnDestroy(): void {
    this.modal.destroy()
    if (this.oSub) {
      this.oSub.unsubscribe()
    }
  }
  
  open() {
    this.modal.open()
  }
  
  cancel() {
    this.modal.close()
  }
  
  submit() {
    this.pending = true
    
    const order: IOrder = {
      list: this.orderService.list.map(item => {
        delete item._id
        return item
      })
    }
    
    this.oSub = this.ordersService.create(order).subscribe(
      (newOrder) => {
        MaterialService.toast(`Заказ №${newOrder.order} был добавлен`) 
        this.orderService.clear()
      },
      (error) => { MaterialService.toast(error.error.message) },
      () => {
        this.modal.close() 
        
        this.pending = false
      }
    )
  }
  
  removePosition(orderPosition: IOrderPosition) {
    this.orderService.remove(orderPosition)
  }
}
