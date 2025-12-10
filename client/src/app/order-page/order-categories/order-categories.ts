import { Component, inject, OnInit } from '@angular/core';
import { CategoriesService } from '../../shared/services/categories.service';
import { Observable } from 'rxjs';
import { ICategory } from '../../shared/interfaces';

@Component({
  selector: 'app-order-categories',
  standalone: false,
  templateUrl: './order-categories.html',
  styleUrl: './order-categories.scss',
})
export class OrderCategories implements OnInit{
  private categoriesService = inject(CategoriesService)
  categories$!: Observable<ICategory[]>
  
  ngOnInit(): void {
    this.categories$ = this.categoriesService.get()
  }
  
  
}
