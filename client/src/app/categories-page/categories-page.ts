import { Component, inject, OnInit, signal } from '@angular/core';
import { CategoriesService } from '../shared/services/categories.service';
import { ICategory } from '../shared/interfaces';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-categories-page',
  standalone: false,
  templateUrl: './categories-page.html',
  styleUrl: './categories-page.scss',
})
export class CategoriesPage implements OnInit {
  private categoriesService = inject(CategoriesService);
  aSub!: Subscription

  loading = signal(false);

  categories: ICategory[] = [];

  ngOnInit(): void {
    this.loading.set(true);

    this.categoriesService.get().subscribe(categories => {
      this.loading.set(false);
      this.categories = categories;
      console.log(categories);
    });
  }
  
  ngOnDestroy(): void {
    if (this.aSub) {
      this.aSub.unsubscribe();
    }
  }
}
