import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { PositionsService } from '../../shared/services/positions.service';
import { map, Observable, switchMap } from 'rxjs';
import { IPosition } from '../../shared/interfaces';
import { OrderService } from '../order.service';
import { MaterialService } from '../../shared/classes/material.service';

@Component({
  selector: 'app-order-positions',
  standalone: false,
  templateUrl: './order-positions.html',
  styleUrl: './order-positions.scss',
})
export class OrderPositions implements OnInit {
  positions$!: Observable<IPosition[]>
  private route = inject(ActivatedRoute)
  private positionsService = inject(PositionsService)
  private orderService = inject(OrderService)
  
  ngOnInit(): void {
    this.positions$ = this.route.params.pipe(
      switchMap(
        (params: Params) => {
          return this.positionsService.get(params['id'])
        }
        
      ),
      map(
        (positions: IPosition[]) => {
          return positions.map((position) => {
            position.quantity = 1
            return position
          })
        }
      )
    )
  }
  
  addToOrder(position: IPosition) {
    MaterialService.toast(`Добавлено x${position.quantity}`)
    this.orderService.add(position)
  }
}
