import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-filter-panel',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './filter-panel.component.html',
  styleUrl: './filter-panel.component.scss',
})
export class FilterPanelComponent {
  @Input() formGroup!: FormGroup;
  @Input() title: string = 'Filtros';
  @Input() subtitle: string = '';

  @Output() searchClicked = new EventEmitter<void>();
  @Output() clearClicked = new EventEmitter<void>();

  onSearch(): void {
    this.searchClicked.emit();
  }

  onClear(): void {
    this.clearClicked.emit();
  }
}
