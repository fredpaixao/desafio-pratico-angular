import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
})
export class PaginationComponent implements OnChanges {
  @Input() totalItems: number = 0;
  @Input() pageSize: number = 10;
  @Input() pageIndex: number = 0;

  @Output() pageChange = new EventEmitter<{ pageIndex: number; pageSize: number }>();

  totalPages: number = 0;
  currentPage: number = 1;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['totalItems'] || changes['pageSize']) {
      this.totalPages = Math.ceil(this.totalItems / this.pageSize);
    }
    if (changes['pageIndex']) {
      this.currentPage = this.pageIndex + 1;
    }
  }

  goToFirstPage(): void {
    if (this.pageIndex > 0) {
      this.pageChange.emit({ pageIndex: 0, pageSize: this.pageSize });
    }
  }

  goToPreviousPage(): void {
    if (this.pageIndex > 0) {
      this.pageChange.emit({ pageIndex: this.pageIndex - 1, pageSize: this.pageSize });
    }
  }

  goToNextPage(): void {
    if (this.pageIndex < this.totalPages - 1) {
      this.pageChange.emit({ pageIndex: this.pageIndex + 1, pageSize: this.pageSize });
    }
  }

  goToLastPage(): void {
    if (this.pageIndex < this.totalPages - 1) {
      this.pageChange.emit({ pageIndex: this.totalPages - 1, pageSize: this.pageSize });
    }
  }

  isFirstPage(): boolean {
    return this.pageIndex === 0;
  }

  isLastPage(): boolean {
    return this.pageIndex >= this.totalPages - 1 || this.totalPages === 0;
  }
}
