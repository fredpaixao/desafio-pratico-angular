import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-form-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatButtonModule, MatIconModule],
  templateUrl: './form-modal.component.html',
  styleUrl: './form-modal.component.scss',
})
export class FormModalComponent {
  @Input() formGroup!: FormGroup;
  @Input() title: string = 'Formulário';
  @Input() submitButtonText: string = 'Salvar';
  @Input() cancelButtonText: string = 'Cancelar';

  @Output() submitted = new EventEmitter<any>();
  @Output() cancelled = new EventEmitter<void>();

  onSubmit(): void {
    if (this.formGroup.valid) {
      this.submitted.emit(this.formGroup.value);
    }
  }

  onCancel(): void {
    this.cancelled.emit();
  }
}
