import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, inject, Input, OnDestroy, OnInit, signal, ViewChild } from '@angular/core';
import { PositionsService } from '../../../shared/services/positions.service';
import { IPosition } from '../../../shared/interfaces';
import { IMaterialInstance, MaterialService } from '../../../shared/classes/material.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { materialize } from 'rxjs';

@Component({
  selector: 'app-positions-form',
  standalone: false,
  templateUrl: './positions-form.html',
  styleUrl: './positions-form.scss',
})
export class PositionsForm implements OnInit, AfterViewInit, OnDestroy {
  @Input() categoryId?: string;
  @ViewChild('modal') modalRef?: ElementRef<HTMLDivElement>
  positions: IPosition[] = [];
  loading = signal(false)
  modal?: IMaterialInstance
  form!: FormGroup
  positionId?: string | null
  private positionService = inject(PositionsService);
  private cdr = inject(ChangeDetectorRef)

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      cost: new FormControl(1, [Validators.required, Validators.min(1)])
    })
    
    this.loading.set(true)
    if (!this.categoryId) return;
    this.positionService.get(this.categoryId).subscribe((positions) => {
      this.positions = positions;
      this.loading.set(false)
    });
  }
  
  ngAfterViewInit(): void {
    if(!this.modalRef) return
    this.modal = MaterialService.initModal(this.modalRef)
  }
  
  ngOnDestroy(): void {
    this.modal?.destroy()
  }
  
  private completed() {
    this.modal?.close();
    this.form.reset({ name: '', cost: 1 });
    MaterialService.updateTextInputs();
    this.form.enable();
  }
  
  onSubmit() {
    this.form.disable()
    
    const newPosition: IPosition = {
      name: this.form.value.name,
      cost: this.form.value.cost,
      category: this.categoryId
    }
    
    if (this.positionId) { //если есть id, редактируем позицию
      newPosition._id = this.positionId
      this.positionService.update(newPosition).subscribe(
        (position) => {
          const idxPosition = this.positions.findIndex(p => p._id === position._id)
          this.positions[idxPosition] = position
          MaterialService.toast('Изменения сохранены');
        },
        (error) => {
          MaterialService.toast(error.error.message);
        },
        () => this.completed()
      )
    }
    else { //если нет, создаем позицию
      this.positionService.create(newPosition).subscribe(
        (position) => {
          MaterialService.toast('Позиция создана');
          this.positions.push(position);
          this.cdr.detectChanges();

        },
        (error) => {
          MaterialService.toast(error.error.message);
        },
        () => this.completed()
      )
    }
    
  }
  
  onSelectPosition(position: IPosition) {
    this.positionId = position._id
    this.form.patchValue({
      name: position.name,
      cost: position.cost
    })
    this.modal?.open();
    MaterialService.updateTextInputs()
  }
  
  onAddPosition() {
    this.positionId = null
    this.form.reset({
      name: '',
      cost: 1
    });
    this.modal?.open();
    MaterialService.updateTextInputs()
  }
  
  onCancel() {
    this.modal?.close()
  }
  
  onDeletePosition(event: Event, position: IPosition) {
    event.stopPropagation()
    const decision = window.confirm(`Удалить позицию ${position.name}?`)
    if (decision) {
      this.positionService.delete(position).subscribe(
        (response) => {
          const idxPosition = this.positions.findIndex(p => p?._id === position?._id)
          this.positions.splice(idxPosition, 1)
          MaterialService.toast(response.message)
          this.cdr.detectChanges()
        },
        (error) => MaterialService.toast(error.error.message)
      )
    }
    
  }
}
