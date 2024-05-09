import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Category } from '../category.dto';
import { MaterialModule } from '../../material.module';

@Component({
  selector: 'category-form',
  standalone: true,
  imports: [
    MaterialModule
  ],
  templateUrl: './form.component.html',
  styles: ``
})
export class CategoryFormComponent {
  private fb = inject(FormBuilder)

  @Output() save = new EventEmitter<Category>();

  onSubmit() {
    console.log("Botão salvar clicado no CategoryFormCompenent")
    this.save.emit(this.categoryForm.value as Category)
  }

  @Output() back = new EventEmitter(); // quando precisa chamar um evento no componente pai

  onBack() {
    this.back.emit()
  }

  categoryForm = this.fb.group({
    id: [null],
    name: ['', [Validators.required, Validators.minLength(3)]],
    description: ['', Validators.required]
  })

  @Input()
  set category(category: Category) {
    this.categoryForm.setValue(category)
  }
  
}
