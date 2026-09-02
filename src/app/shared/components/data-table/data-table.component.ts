import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { CurrencyBrPipe } from '../../pipes/currency-br.pipe';

export interface ColumnConfig {
  key: string;
  label: string;
  type: 'text' | 'number' | 'currency' | 'date' | 'custom';
  sortable?: boolean;
  width?: string;
}

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [CommonModule, MatTableModule, CurrencyBrPipe],
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.scss',
})
export class DataTableComponent<T extends Record<string, any>> implements OnInit {
  @Input() dataSource: T[] = [];
  @Input() columns: ColumnConfig[] = [];
  @Input() displayColumns: string[] = [];
  @Input() enableSelection: boolean = false;
  @Input() identifierKey: string = 'id';
  @Input() isLoading: boolean = false;

  @Output() selectionChange = new EventEmitter<T[]>();
  @Output() rowClick = new EventEmitter<T>();

  selectedItems: Set<any> = new Set();
  isAllSelected: boolean = false;

  displayedColumnsWithSelection: string[] = [];

  ngOnInit(): void {
    this.updateDisplayedColumns();
  }

  ngOnChanges(): void {
    this.updateDisplayedColumns();
    this.updateIsAllSelected();
  }

  private updateDisplayedColumns(): void {
    this.displayedColumnsWithSelection = this.enableSelection
      ? ['checkbox', ...this.displayColumns]
      : this.displayColumns;
  }

  private updateIsAllSelected(): void {
    this.isAllSelected =
      this.dataSource.length > 0 &&
      this.selectedItems.size === this.dataSource.length;
  }

  onSelectAll(event: any): void {
    if (event.target.checked) {
      this.selectedItems = new Set(
        this.dataSource.map((item) => item[this.identifierKey])
      );
    } else {
      this.selectedItems.clear();
    }
    this.updateIsAllSelected();
    this.emitSelectionChange();
  }

  onSelectRow(item: T, event: any): void {
    const id = item[this.identifierKey];
    if (event.target.checked) {
      this.selectedItems.add(id);
    } else {
      this.selectedItems.delete(id);
    }
    this.updateIsAllSelected();
    this.emitSelectionChange();
  }

  isRowSelected(item: T): boolean {
    return this.selectedItems.has(item[this.identifierKey]);
  }

  private emitSelectionChange(): void {
    const selected = this.dataSource.filter((item) =>
      this.selectedItems.has(item[this.identifierKey])
    );
    this.selectionChange.emit(selected);
  }

  getColumnValue(item: T, column: ColumnConfig): any {
    const value = item[column.key];

    switch (column.type) {
      case 'currency':
        return value; // Will be formatted by pipe in template
      case 'number':
        return typeof value === 'number' ? value : parseInt(value);
      case 'date':
        return new Date(value);
      case 'text':
      default:
        return value;
    }
  }

  onRowClick(item: T, event: any): void {
    // Don't emit if clicking on checkbox
    if (event.target.type !== 'checkbox') {
      this.rowClick.emit(item);
    }
  }
}
