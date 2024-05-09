import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { Category } from '../category.dto';

@Component({
  selector: 'category-form',
  standalone: true,
  imports: [
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatCardModule
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
