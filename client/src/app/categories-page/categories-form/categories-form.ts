import { ChangeDetectorRef, Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CategoriesService } from '../../shared/services/categories.service';
import { of, switchMap } from 'rxjs';
import { MaterialService } from '../../shared/classes/material.service';
import { ICategory } from '../../shared/interfaces';

@Component({
  selector: 'app-categories-form',
  standalone: false,
  templateUrl: './categories-form.html',
  styleUrl: './categories-form.scss',
})
export class CategoriesForm implements OnInit {
  private route = inject(ActivatedRoute);
  private categoriesService = inject(CategoriesService);
  private cdr = inject(ChangeDetectorRef);
  private router = inject(Router);
  isNew: boolean = true;
  form!: FormGroup;
  image!: File;
  imagePreview: any = '';
  category?: ICategory;
  @ViewChild('input') inputRef!: ElementRef<HTMLInputElement>;

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required)
    });

    this.form.disable();

    this.route.params.pipe(
      switchMap(
        (params: Params) => {
          if (params['id']) {
            this.isNew = false;

            return this.categoriesService.getById(params['id']);
          }
          return of(null);
        }
      )
    ).subscribe(
      category => {
        if (category) {
          this.category = category;
          this.form.patchValue({
            name: category.name
          });
          this.imagePreview = category.imageSrc;
          MaterialService.updateTextInputs();
        }
        this.form.enable();
      },
      error => MaterialService.toast(error.error.message)
    );
  }

  triggerClick() {
    this.inputRef.nativeElement.click();
  }

  onSubmit() {
    let obs$;
    this.form.disable();

    if (this.isNew) {
      obs$ = this.categoriesService.create(this.form.value.name, this.image);
    }
    else {
      obs$ = this.categoriesService.update(this.category?._id, this.form.value.name, this.image);
    }

    obs$.subscribe(
      (category) => {
        this.category = category;
        MaterialService.toast('Изменения сохранены');
        this.form.enable();
      },
      (error) => {
        MaterialService.toast(error.error.message);
        this.form.enable();
      });
  }

  onFileUpload(event: any) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;
    this.image = file;
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
      this.cdr.detectChanges();
    };
    if (this.inputRef && this.inputRef.nativeElement) {
      this.inputRef.nativeElement.value = '';
    }
    reader.readAsDataURL(file);
  }

  deleteCategory() {
    const decision = window.confirm(`Вы уверены, что хотите удалить категорию ${this.category?.name}`);
    if (!decision) return;
    if (!this.category?._id) {
      MaterialService.toast('id категории не найден');
      return;
    }

    this.categoriesService.delete(this.category?._id).subscribe(
      (response) => MaterialService.toast(response.message), //успех
      (error) => MaterialService.toast(error.error.message), //ошибка
      () => this.router.navigate(['/categories']) //completely
    );
  }


}
